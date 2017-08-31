const styles = require("./styles.csjs");
const Nanocomponent = require("nanocomponent");
const html = require("bel");
// const cn = require("classnames");

class Providers extends Nanocomponent {
  createElement () {
    return html`
      <div class="${styles.providersGroup}">
        <div class="${styles.providersSeparator}">or</div>
        <button class="${styles.providerGoogle} ${styles.btn}">Google</button>
        <button class="${styles.providerGitHub} ${styles.btn}">GitHub</button>
        <button class="${styles.providerGitLab} ${styles.btn}">Gitlab</button>
        <button class="${styles.providerBitbucket} ${styles.btn}">Bitbucket</button>
      </div>
    `;
  }

  update () {
    return false;
  }
}

module.exports = Providers;
