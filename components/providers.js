const styles = require("./styles.csjs");
const Nanocomponent = require("nanocomponent");
const html = require("bel");
// const cn = require("classnames");

class Providers extends Nanocomponent {
  createElement () {
    return html`
      <div class="${styles.providersGroup}">
        <div class="${styles.providersSeparator}">
          <span class="${styles.separatorLine}"></span>
          <span>or</span>
        </div>
        <button class="${styles.providerGoogle} ${styles.btn}"><span>Login with Google</span></button>
        <button class="${styles.providerGitHub} ${styles.btn}"><span>Login with GitHub</span></button>
        <button class="${styles.providerGitLab} ${styles.btn}"><span>Login with Gitlab</span></button>
        <button class="${styles.providerBitbucket} ${styles.btn}"><span>Login with Bitbucket</span></button>
      </div>
    `;
  }

  update () {
    return false;
  }
}

module.exports = Providers;
