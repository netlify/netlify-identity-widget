const GoTrue = require("gotrue-js").default;
const Nanobus = require("nanobus");
const Modal = require("./components/modal");
const queryString = require("query-string");

// Set up an event emitter and state controller
class NetlifyIdentity extends Nanobus {
  constructor (opts, goTrueOpts) {
    super();

    if (!goTrueOpts) {
      goTrueOpts = opts;
      opts = {};
    }

    opts = Object.assign({ open: false }, opts);

    this.goTrue = new GoTrue(goTrueOpts);
    this.modal = new Modal(opts);
    this.emit = this.emit.bind(this);

    this.state = {
      open: opts.open,
      page: "login",
      submitting: false,
      success: null /* Success message goes here */,
      error: null /* Error message goes here */,
      user: null,
      settings: { external: {} }
    };

    this.on("render", () => {
      if (!this.isMounted) {
        return console.warn("NetlifyIdentity: widget must be mounted first");
      }
      this.modal.render(this.state, this.emit);
    });

    store(this.state, this, this.goTrue); // Hook up event handlers
  }

  get isMounted () {
    return this.modal.element;
  }

  create () {
    if (this.isMounted) {
      return console.warn("NetlifyIdentity: Already created");
    }

    const user = this.goTrue.currentUser();
    if (user) {
      this.state.page = "logout";
      this.state.user = user;
      this.emit("login", user);
    }

    return this.goTrue
      .settings()
      .then(settings => {
        this.state.settings = settings;
      })
      .then(() => this._parseHashTokens())
      .then(() => this.modal.render(this.state, this.emit));
  }

  open () {
    if (!this.isMounted) {
      return console.warn(
        "NetlifyIdentity: Can't open before mounting in the DOM"
      );
    }
    this.state.open = true;
    this.emit("render");
  }

  close () {
    if (!this.isMounted) {
      return console.warn(
        "NetlifyIdentity: Can't close before mounting in the DOM"
      );
    }
    this.state.open = false;
    this.emit("render");
  }

  _parseHashTokens () {
    const parsedHash = queryString.parse(window.location.hash);
    if (parsedHash.error) {
      window.location.hash = "";
      this.state.error = `Error ${parsedHash.error}: ${parsedHash.error_description}`;
      this.emit("error", new Error(parsedHash.error_description));
      return Promise.resolve();
    }

    if (parsedHash.confirmation_token) {
      window.location.hash = "";
      return this.goTrue
        .confirm(parsedHash.confirmation_token)
        .then(user => {
          this.state.success = `Logged in ${user.email}`;
          this.state.page = "logout";
          this.state.user = user;
          this.emit("login", user);
        })
        .catch(err => {
          this.state.error = "Failed to confirm email";
          this.emit("error", err);
        });
    }

    if (parsedHash.recovery_token) {
      window.location.hash = "";
      return this.goTrue
        .recover(parsedHash.recovery_token)
        .then(user => {
          this.state.success = `Logged in ${user.email}`;
          this.state.page = "logout";
          this.state.user = user;
          this.emit("login", user);
        })
        .catch(err => {
          this.state.error = "Failed to recover account";
          this.emit("error", err);
        });
    }

    if (parsedHash.invite_token) {
      window.location.hash = "";
      // TODO prompt for password then call
      // this.goTrue.acceptInvite(parsedHash.invite_token, password)...
      // probably can use a variant of signup with the email readonly
      return Promise.resolve();
    }

    if (parsedHash.email_change_token) {
      window.location.hash = "";
      const user = this.goTrue.currentUser();
      if (!user) {
        // TODO prompt for login, then update
        return Promise.resolve();
      }

      return user
        .update({ email_change_token: parsedHash.email_change_token })
        .then(user => {
          this.state.success = "Email change was successful";
          this.state.user = user;
        })
        .catch(err => {
          this.state.error = "Failed to change email";
          this.emit("error", err);
        });
    }

    if (parsedHash.access_token) {
      window.location.hash = "";
      const remember = true;
      return this.goTrue
        .createUser(parsedHash, remember)
        .then(user => {
          this.state.success = `Logged in ${user.email}`;
          this.state.page = "logout";
          this.state.user = user;
          this.emit("login", user);
        })
        .catch(err => {
          this.state.error = "Login failed";
          this.emit("error", err);
        });
    }

    return Promise.resolve();
  }
}

module.exports = NetlifyIdentity;

function store (state, emitter, goTrue) {
  emitter.on("navigate", page => {
    state.page = page;
    emitter.emit("render");
  });

  emitter.on("close", () => {
    state.open = false;
    emitter.emit("render");
  });

  emitter.on("submit-signup", ({ email, password, name }) => {
    state.submitting = true;
    emitter.emit("render");
    goTrue.signup(email, password, { full_name: name }).then(
      response => {
        if (state.settings.autoconfirm) {
          emitter.emit("signup", response);
          emitter.emit("submit-login", { email, password });
          return;
        }
        state.success = "Confirmation email sent";
        state.submitting = false;
        emitter.emit("render");
        emitter.emit("signup", response);
      },
      error => {
        state.error = error.error_description || "We couldn’t sign you up";
        state.submitting = false;
        emitter.emit("render");
        emitter.emit("error", error);
      }
    );
  });

  emitter.on("submit-login", ({ email, password }) => {
    state.submitting = true;
    emitter.emit("render");
    const remember = true;
    goTrue.login(email, password, remember).then(
      user => {
        state.success = `Logged in ${user.email}`;
        state.submitting = false;
        state.page = "logout";
        state.user = user;
        emitter.emit("render");
        emitter.emit("login", user);
      },
      error => {
        state.error = error.error_description || "We couldn’t log you in";
        state.submitting = false;
        emitter.emit("render");
        emitter.emit("error", error);
      }
    );
  });

  emitter.on("external-login", ({ provider }) => {
    const url = goTrue.loginExternalUrl(provider);
    window.location.href = url;
  });

  emitter.on("submit-logout", () => {
    state.submitting = true;
    emitter.emit("render");

    const user = goTrue.currentUser();
    if (user) {
      user.logout().then(() => {
        state.submitting = false;
        state.page = "login";
        state.user = null;
        state.success = "Logged out";
        emitter.emit("render");
      });
    }
  });

  emitter.on("clear-error", () => {
    state.error = null;
  });

  emitter.on("clear-success", () => {
    state.success = null;
  });
}
