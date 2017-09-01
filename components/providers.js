// const styles = require("../styles.csjs");
const Nanocomponent = require("nanocomponent");
const html = require("bel");
// const cn = require("classnames");

class Providers extends Nanocomponent {
  createElement () {
    return html`
      <ul>
        <li>Github</li>
        <li>Google</li>
      </ul>
      `;
  }

  update () {
    return false;
  }
}

module.exports = Providers;
