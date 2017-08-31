const styles = require("./styles.csjs");
const Nanocomponent = require("nanocomponent");
const html = require("bel");
// const cn = require("classnames");

class LoginForm extends Nanocomponent {
  constructor () {
    super();

    this.state = {};
    this.emit = null;

    this.email = "";
    this.password = "";

    this.handleEmailInput = this.handleInput.bind(this, "email");
    this.handlePasswordInput = this.handleInput.bind(this, "password");
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  createElement (state, emit) {
    this.state = state;
    this.emit = emit;
    return html`
      <form
        onsubmit=${this.handleSubmit}
        class="${styles.form}">
        <div class="${styles.formGroup}">
          <input
            value="${this.email}"
            oninput=${this.handleEmailInput}
            type="email"
            required />
          <label>Email</label>
        </div>
        <div class="${styles.formGroup}">
          <input
            value="${this.email}"
            oninput=${this.handlePasswordInput}
            type="password"
            required />
          <label>Password</label>
        </div>
        <button type="submit" value="Log in">Log in</button>
      </form>
    `;
  }

  update (state, emit) {
    return false;
  }

  handleInput (key, ev) {
    this[key] = ev.target.value;
  }

  handleSubmit (ev) {
    ev.preventDefault();

    this.emit("submit-login", {
      email: this.email,
      password: this.password
    });

    this.email = "";
    this.password = "";

    this.render(this.state, this.emit);
    return false;
  }
}

exports.LoginForm = LoginForm;

class SignupForm extends Nanocomponent {
  constructor () {
    super();

    this.state = {};
    this.emit = null;

    this.name = "";
    this.email = "";
    this.password = "";

    this.handleNameInput = this.handleInput.bind(this, "name");
    this.handleEmailInput = this.handleInput.bind(this, "email");
    this.handlePasswordInput = this.handleInput.bind(this, "password");
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  createElement (state, emit) {
    this.state = state;
    this.emit = emit;
    return html`
      <form onsubmit=${this.handleSubmit} class="${styles.form}">
        <label>
          Name
          <input
            oninput=${this.handleNameInput}
            value="${this.name}"
            type="text"/>
        </label>
        <label>
          Email
          <input
            oninput=${this.handleEmailInput}
            value="${this.email}"
            type="email"/>
        </label>
        <label>
          Password
          <input
            oninput=${this.handlePasswordInput}
            value="${this.password}"
            type="password"/>
        </label>
        <input type="submit" value="Signup">
      </form>
    `;
  }

  update () {
    return false;
  }

  handleInput (key, ev) {
    this[key] = ev.target.value;
  }

  handleSubmit (ev) {
    ev.preventDefault();

    this.emit("submit-signup", {
      name: this.name,
      email: this.email,
      password: this.password
    });

    this.name = "";
    this.email = "";
    this.password = "";

    this.render(this.state, this.emit);
    return false;
  }
}

exports.SignupForm = SignupForm;
