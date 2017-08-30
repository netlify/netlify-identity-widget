const GoTrue = require("gotrue-js").default;
const Nanobus = require("nanobus");
const ModalComponent = require("./modal-component");

// Set up an event emitter and state controller
class NetlifyIdentity extends Nanobus {
  constructor (opts, goTrueOpts) {
    super();

    if (!goTrueOpts) {
      goTrueOpts = opts;
      opts = {};
    }

    opts = Object.assign({}, opts);

    goTrueOpts = Object.assign(
      {
        APIUrl: "https://auth.netlify.com"
      },
      goTrueOpts
    );

    this.goTrue = new GoTrue(goTrueOpts);
    this.modal = new ModalComponent(opts);
    this.emit = this.emit.bind(this);

    this.state = {
      open: false,
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

  mount (domNode) {
    if (this.isMounted) {
      return console.warn("NetlifyIdentity: already mounted");
    }
    domNode.appendChild(this.modal.render(this.state, this.emit));
  }

  open () {
    this.state.open = true;
    this.emit("render");
  }

  close () {
    this.state.open = false;
    this.emit("render");
  }
}

module.exports = NetlifyIdentity;
