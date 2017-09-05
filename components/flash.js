const styles = require("./styles.csjs");
const Nanocomponent = require("nanocomponent");
const html = require("bel");

class Flash extends Nanocomponent {
  constructor () {
    super();

    this.error = null;
    this.success = null;
  }

  createElement (state, emit) {
    const { error, success } = state;

    this.error = error;
    this.success = success;

    if (error) {
      emit("clear-error");
      return html`
        <div class="${styles.error} ${styles.flashMessage}" role="alert">${error}</div>
      `;
    }

    if (success) {
      emit("clear-success");
      return html`
        <div class="${styles.success} ${styles.flashMessage}" role="alert" aria-live="polite">${success}</div>
      `;
    }

    return html`
      <div></div>
    `;
  }

  update (state, emit) {
    const { error, success } = state;

    if (this.error !== error) return true;
    if (this.success !== success) return true;
    return false;
  }
}

module.exports = Flash;
