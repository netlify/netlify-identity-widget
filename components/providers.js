const styles = require("./styles.csjs");
const Nanocomponent = require("nanocomponent");
const html = require("bel");
// const cn = require("classnames");

class Providers extends Nanocomponent {
  createElement () {
    return html`
      <div class="${styles.providersGroup}">
        <button class="${styles.providerGoogle} ${styles.btn} ${styles.btnProvider}">Continue with Google</button>
        <button class="${styles.providerGitHub} ${styles.btn} ${styles.btnProvider}">Continue with GitHub</button>
        <button class="${styles.providerGitLab} ${styles.btn} ${styles.btnProvider}">Continue with GitLab</button>
        <button class="${styles.providerBitbucket} ${styles.btn} ${styles.btnProvider}">Continue with Bitbucket</button>
      </div>
    `;
  }

  update () {
    return false;
  }
}

module.exports = Providers;
