const html = require("bel");
const styles = require("./styles.csjs");
const Nanocomponent = require("nanocomponent");

class PasswordInput extends Nanocomponent {
  constructor() {
    super();
    this.password = "";
    this.handleInput = this.handleInput.bind(this);
  }

  createElement (state, emit) {
    return html`
      <div class="${styles.formGroup}">
        <label>
          <span class="${styles.visuallyHidden}">Enter a password</span>
          <input
            class="${styles.formControl}"
            type="password"
            name="password"
            oninput=${this.handleInput}
            value="${this.password}"
            placeholder="Password"
            required
          />
          <div class="${styles.inputFieldIcon} ${styles.inputFieldPassword}"></div>
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

module.exports = PasswordInput;
