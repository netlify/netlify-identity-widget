const styles = require("./styles.csjs");
const Nanocomponent = require("nanocomponent");
const html = require("bel");
const cn = require("classnames");

class LoginForm extends Nanocomponent {
  constructor () {
    super();

    this.emit = null;

    this.email = "";
    this.password = "";

    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  createElement (state, emit) {
    this.emit = emit;

    const { submitting } = state;
    const disabledClass = cn({ [styles.disabled]: submitting });
    const savingClass = cn({ [styles.saving]: submitting });

    return html`
      <form
        onsubmit=${this.handleSubmit}
        class="${styles.form} ${disabledClass}">
        <div class="${styles.formGroup}">
          <label>
            <span class="${styles.visuallyHidden}">
              Enter your email
            </span>
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
      email: this.email,
      password: this.password
    });

    this.rerender();
  }
}

exports.LoginForm = LoginForm;

class SignupForm extends Nanocomponent {
  constructor () {
    super();

    this.emit = null;

    this.name = "";
    this.email = "";
    this.password = "";

    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  createElement (state, emit) {
    this.emit = emit;

    const { submitting } = state;
    const disabledClass = cn({ [styles.disabled]: submitting });
    const savingClass = cn({ [styles.saving]: submitting });

    return html`
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
        <button type="submit" class="${styles.btn} ${savingClass}">
          ${submitting ? "Signing up" : "Sign up"}
        </button>
      </form>
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
      email: this.email,
      password: this.password
    });

    this.rerender();
  }
}

exports.SignupForm = SignupForm;

class LogoutForm extends Nanocomponent {
  constructor () {
    super();

    this.emit = null;

    this.handleLogout = this.handleLogout.bind(this);
  }

  createElement (state, emit) {
    this.emit = emit;

    const { submitting, user } = state;
    const disabledClass = cn({ [styles.disabled]: submitting });
    const savingClass = cn({ [styles.saving]: submitting });
    const email = (user && user.email) || "";

    return html`
      <form
        onsubmit=${this.handleLogout}
        class="${styles.form} ${disabledClass}"
      >
        <p>
          Logged in ${email ? "as " : ""} ${email}
        </p>
          <Button
            type="submit"
            class="${styles.btn} ${savingClass}"
          >
            Log out
          </Button>
      </form>
    `;
  }

  update (state, emit) {
    return true;
  }

  handleLogout (e) {
    e.preventDefault();

    this.emit("submit-logout");

    this.rerender();
  }
}

exports.LogoutForm = LogoutForm;
