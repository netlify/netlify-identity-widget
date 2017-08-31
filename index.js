const GoTrue = require("gotrue-js").default;
const Nanobus = require("nanobus");
const Modal = require("./components/modal");

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
      message: "messages go here"
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
      return console.warn("NetlifyIdentity: Alredy created");
    }
    return this.modal.render(this.state, this.emit);
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
        state.message = "Confirmation email sent";
        state.submitting = false;
        emitter.emit("render");
        emitter.emit("signup", response);
      },
      error => {
        // TODO: handle errors better
        state.message = `Failed to regisger ${JSON.stringify(error)}`;
        state.submitting = false;
        emitter.emit("render");
        emitter.emit("error", error);
      }
    );
  });

  emitter.on("submit-login", ({ email, password }) => {
    state.submitting = true;
    emitter.emit("render");
    goTrue.login(email, password).then(
      user => {
        state.message = `Logged in ${user.email}`;
        state.submitting = false;
        emitter.emit("render");
        emitter.emit("login", user);
      },
      error => {
        state.message = `Failed to log in ${JSON.stringify(error)}`;
        state.submitting = false;
        emitter.emit("render");
        emitter.emit("error", error);
      }
    );
  });
}
