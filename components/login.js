const styles = require("./styles.csjs");
const Nanocomponent = require("nanocomponent");
const html = require("bel");
const cn = require("classnames");
const EmailInput = require("./email");
const Header = require("./header");
const Providers = require("./providers");
const Flash = require("./flash");

class LoginForm extends Nanocomponent {
  constructor () {
    super();

    this.emit = null;

    this.password = "";

    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.header = new Header();
    this.providers = new Providers();
    this.flash = new Flash();
    this.emailInput = new EmailInput();

    this.forgotPassword = this.forgotPassword.bind(this);
  }

  forgotPassword () {
    this.emit("navigate", { page: "forgot" });
  }

  createElement (state, emit) {
    this.emit = emit;

    const { submitting } = state;
    const disabledClass = cn({ [styles.disabled]: submitting });
    const savingClass = cn({ [styles.saving]: submitting });

    return html`
      <div>
        ${this.header.render(state, emit)}
        ${this.flash.render(state, emit)}
        <form
          onsubmit=${this.handleSubmit}
          class="${styles.form} ${disabledClass}">
          ${this.emailInput.render(state, emit)}
          <div class="${styles.formGroup}">
            <label>
              <span class="${styles.visuallyHidden}">
                Enter your password
              </span>
              <input
                class="${styles.formControl}"
                type="password"
                name="password"
                value="${this.password}"
                placeholder="Password"
                required
                oninput=${this.handleInput}
              />
              <div class="${styles.inputFieldIcon} ${styles.inputFieldPassword}"></div>
            </label>
          </div>
          <button type="submit" class="${styles.btn} ${savingClass}">
            ${submitting ? "Logging in" : "Log In"}
          </button>
        </form>
        ${this.providers.render(state, emit)}
        <button onclick=${this.forgotPassword} class="${styles.btnLink} ${styles.forgotPasswordLink}">Forgot password?</button>
      </div>
    `;
  }

  update (state, emit) {
    return true;
  }

  handleInput (e) {
    this[e.target.name] = e.target.value;
  }

  handleSubmit (e) {
    e.preventDefault();

    this.emit("submit-login", {
      email: this.emailInput.email,
      password: this.password
    });

    this.rerender();
  }
}

module.exports = LoginForm;