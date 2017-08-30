const GoTrue = require("gotrue-js").default;
const Nanobus = require("nanobus");
const Modal = require("./components/Modal");

// Set up an event emitter and state controller
class NetlifyIdentity extends Nanobus {
  constructor (opts, goTrueOpts) {
    super();

    if (!goTrueOpts) {
      goTrueOpts = opts;
      opts = {};
    }

    opts = Object.assign(
      {
        open: false
      },
      opts
    );

    goTrueOpts = Object.assign(
      {
        APIUrl: "https://auth.netlify.com"
      },
      goTrueOpts
    );

    this.goTrue = new GoTrue(goTrueOpts);
    this.modal = new Modal(opts);
    this.emit = this.emit.bind(this);

    this.state = {
      open: opts.open,
      page: "login"
    };

    this.on("render", () => {
      if (!this.isMounted) {
        return console.warn("NetlifyIdentity: widget must be mounted first");
      }
      this.modal.render(this.state, this.emit);
    });

    this.on("navigate", page => {
      this.state.page = page;
      this.emit("render");
    });

    this.on("close", () => {
      this.state.open = false;
      this.emit("render");
    });
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
