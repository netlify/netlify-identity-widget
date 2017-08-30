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
  }

  mount (domNode) {
    domNode.appendChild(this.modal.render());
  }

  get isMounted () {
    return this.modal.element;
  }

  open () {
    this.modal.open();
  }

  close () {
    this.modal.close();
  }
}

module.exports = NetlifyIdentity;
