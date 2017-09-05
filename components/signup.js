const styles = require("./styles.csjs");
const Nanocomponent = require("nanocomponent");
const html = require("bel");
const cn = require("classnames");
const EmailInput = require("./email");
const PasswordInput = require("./password");
const Header = require("./header");
const Providers = require("./providers");
const Flash = require("./flash");

class SignupForm extends Nanocomponent {
  constructor () {
    super();

    this.emit = null;

    this.name = "";
    this.password = "";

    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.header = new Header();
    this.providers = new Providers();
    this.flash = new Flash();
    this.emailInput = new EmailInput();
    this.passwordInput = new PasswordInput();
  }

  createElement (state, emit) {
    this.emit = emit;
    this.state = state;

    const { submitting } = state;
    const disabledClass = cn({ [styles.disabled]: submitting });
    const savingClass = cn({ [styles.saving]: submitting });

    return html`
      <div>
        ${this.header.render(state, emit)}
        ${this.flash.render(state, emit)}
        <form
          onsubmit=${this.handleSubmit}
          class="${styles.form} ${disabledClass}"
        >
          <div class="${styles.formGroup}">
            <label>
              <span class="${styles.visuallyHidden}">Enter your full name</span>
              <input
                class="${styles.formControl}"
                type="text"
                name="name"
                value="${this.name}"
                placeholder="Name"
                required
                oninput=${this.handleInput}
              />
              <div class="${styles.inputFieldIcon} ${styles.inputFieldName}"></div>
            </label>
          </div>
          ${this.emailInput.render(state, emit)}
          ${this.passwordInput.render(state, emit)}
          <button type="submit" class="${styles.btn} ${savingClass}">
            ${submitting ? "Signing up" : "Sign up"}
          </button>
        </form>
        ${this.providers.render(state, emit)}
      </div>
    `;
  }

  update () {
    return true;
  }

  handleInput (e) {
    this[e.target.name] = e.target.value;
  }

  handleSubmit (e) {
    e.preventDefault();

    this.emit("submit-signup", {
      name: this.name,
      email: this.emailInput.email,
      password: this.passwordInput.password
    });

    this.rerender();
  }
}

module.exports = SignupForm;