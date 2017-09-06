const styles = require("./styles.csjs");
const Nanocomponent = require("nanocomponent");
const html = require("bel");

class Providers extends Nanocomponent {
  createElement (state, emit) {
    this.emit = emit;
    const { settings } = state;
    const externalEnabled = Object.keys(settings.external).some(
      k => settings.external[k]
    );

    return html`
      <div class="${styles.providersGroup}">
        ${externalEnabled ? html`<hr class="${styles.hr}" />` : ""}
        ${state.settings.external.google ? html`<button
          onclick=${this.login.bind(this, "google")}
          class="${styles.providerGoogle} ${styles.btn} ${styles.btnProvider}"
        >
          Continue with Google
        </button>` : ""}
        ${state.settings.external.github ? html`<button
          onclick=${this.login.bind(this, "github")}
          class="${styles.providerGitHub} ${styles.btn} ${styles.btnProvider}"
        >
          Continue with GitHub
        </button>` : ""}
        ${state.settings.external.gitlab ? html`<button
          onclick=${this.login.bind(this, "gitlab")}
          class="${styles.providerGitLab} ${styles.btn} ${styles.btnProvider}"
        >
          Continue with GitLab
        </button>` : ""}
        ${state.settings.external.bitbucket ? html`<button
          onclick=${this.login.bind(this, "bitbucket")}
          class="${styles.providerBitbucket} ${styles.btn} ${styles.btnProvider}"
        >
          Continue with Bitbucket
        </button>` : ""}
      </div>
    `;
  }

  update (settings, emit) {
    return true;
  }

  login (provider) {
    this.emit("external-login", { provider });
  }
}

module.exports = Providers;
