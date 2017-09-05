const GoTrue = require("gotrue-js").default;
const Nanobus = require("nanobus");
const Modal = require("./components/modal");
const modalHandlers = require("./handlers/modal");
const goTrueHandlers = require("./handlers/gotrue");

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

    const user = this.goTrue.currentUser();

    this.state = {
      open: opts.open,
      page: user ? "logout" : "login",
      title: user ? "Logged in" : "",
      submitting: false,
      loading: false,
      success: null /* Success message goes here */,
      error: null /* Error message goes here */,
      user: user || null,
      settings: { external: {} }
    };

    this.on("render", () => {
      if (this.isMounted) this.modal.render(this.state, this.emit);
    });

    goTrueHandlers(this.state, this, this.goTrue); // Hook up event handlers
    modalHandlers(this.state, this);

    if (user) window.requestAnimationFrame(() => this.emit("login", user));
    this.emit("init");
  }

  get isMounted () {
    return this.modal.element;
  }

  create () {
    if (this.isMounted) {
      return console.warn("NetlifyIdentity: Already created");
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
