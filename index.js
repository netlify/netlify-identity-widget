const GoTrue = require("gotrue-js").default;
const Nanobus = require("nanobus");
const Modal = require("./components/modal");
const modalHandlers = require("./handlers/modal");
const goTrueHandlers = require("./handlers/gotrue");
const ip = require("ip");

// Set up an event emitter and state controller
class NetlifyIdentity extends Nanobus {
  constructor (opts = {}, goTrueOpts = {}) {
    super();

    const isDevMode = ["localhost", `127.0.01`, `0.0.0.0`].some(
      hostname =>
        hostname === window.location.hostname ||
        ip.isV4Format(window.location.hostname) ||
        ip.isV6Format(window.location.hostname)
    );

    opts = Object.assign({ open: false }, opts);

    let needIdentityURL = false;
    if (isDevMode) {
      const netlifySiteURL =
        goTrueOpts.APIUrl || window.localStorage.getItem("netlifySiteURL");
      if (!netlifySiteURL) {
        needIdentityURL = true;
      } else {
        goTrueOpts.APIUrl = netlifySiteURL;
      }
    }

    let user;
    if (!needIdentityURL) {
      this.goTrue = new GoTrue(goTrueOpts);
      user = this.goTrue.currentUser();
    }
    this.modal = new Modal(opts);
    this.emit = this.emit.bind(this);

    this.state = {
      open: needIdentityURL || opts.open,
      page: needIdentityURL ? "dev-options" : user ? "logout" : "login",
      submitting: false,
      devMode: isDevMode,
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
    if (!isDevMode) this.emit("init");
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
