// const styles = require("../styles.csjs");
const Nanocomponent = require("nanocomponent");
const html = require("bel");
// const cn = require("classnames");

class Footer extends Nanocomponent {
  constructor () {
    super();

    this.emit = null;

    this.close = this.close.bind(this);
  }

  close () {
    this.emit("close");
  }

  createElement (state, emit) {
    this.emit = emit;

    return html`
      <footer>
        <button onclick=${this.close}>close</button>
      </footer>
    `;
  }

  update (emit) {
    return false;
  }
}

module.exports = Footer;
