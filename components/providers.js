const styles = require("./styles.csjs");
const Nanocomponent = require("nanocomponent");
const html = require("bel");

class Providers extends Nanocomponent {
  createElement (state, emit) {
    this.emit = emit;
    const { page } = state;

    switch (page) {
      case "login":
      case "signup":
        return html`
          <div class="${styles.providersGroup}">
            <hr class="${styles.hr}" />
            <button
              onclick=${this.login.bind(this, "google")}
              class="${styles.providerGoogle} ${styles.btn} ${styles.btnProvider}"
            >
              Continue with Google
            </button>
            <button
              onclick=${this.login.bind(this, "github")}
              class="${styles.providerGitHub} ${styles.btn} ${styles.btnProvider}"
            >
              Continue with GitHub
            </button>
            <button
              onclick=${this.login.bind(this, "gitlab")}
              class="${styles.providerGitLab} ${styles.btn} ${styles.btnProvider}"
            >
              Continue with GitLab
            </button>
            <button
              onclick=${this.login.bind(this, "bitbucket")}
              class="${styles.providerBitbucket} ${styles.btn} ${styles.btnProvider}"
            >
              Continue with Bitbucket
            </button>
          </div>
        `;

      default:
        return html`
          <div></div>
        `;
    }
  }

  update () {
    return false;
  }

  login (provider) {
    this.emit("external-login", { provider });
  }
}

module.exports = Providers;
