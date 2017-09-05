const html = require("bel");
const styles = require("./styles.csjs");
const Nanocomponent = require("nanocomponent");

class EmailInput extends Nanocomponent {
  constructor() {
    super();
    this.email = "";
    this.handleInput = this.handleInput.bind(this);
  }

  createElement (state, emit) {
    return html`
      <div class="${styles.formGroup}">
        <label>
        <span class="${styles.visuallyHidden}">Enter your email</span>
        <input
            class="${styles.formControl}"
            type="email"
            name="email"
            value="${this.email}"
            placeholder="Email"
            autocapitalize="off"
            required
            oninput=${this.handleInput}
        />
        <div class="${styles.inputFieldIcon} ${styles.inputFieldEmail}"></div>
        </label>
      </div>
    `;
  }

  update () {
    return true;
  }

  handleInput (e) {
    this[e.target.name] = e.target.value;
  }
}

module.exports = EmailInput;
