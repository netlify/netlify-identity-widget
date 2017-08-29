import GoTrue from "gotrue-js";
import Nanobus from "nanobus";
import ModalComponent from "./modal-component";

// Set up an event emitter and state controller
export default class NetlifyIdentity extends Nanobus {
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

  open () {
    this.modal.open();
  }

  close () {
    this.modal.close();
  }
}
