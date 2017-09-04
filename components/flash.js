const styles = require("./styles.csjs");
const Nanocomponent = require("nanocomponent");
const html = require("bel");

class Flash extends Nanocomponent {
  createElement (state, emit) {
    const { error, success } = state;

    if (error) {
      state.error = null;
      return this.error(error);
    }

    if (success) {
      state.success = null;
      return this.success(success);
    }

    return this.placeHolder();
  }

  success (success) {
    return html`
      <div class="${styles.success}" role="alert" aria-live="polite">${success}</div>
    `;
  }
  error (error) {
    return html`
      <div class="${styles.error}" role="alert">${error}</div>
    `;
  }

  placeHolder () {
    return html`
      <div></div>
    `;
  }

  update (state, emit) {
    return true;
  }
}

module.exports = Flash;
