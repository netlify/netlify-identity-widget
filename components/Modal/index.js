const styles = require("../styles.csjs");
const Nanocomponent = require("nanocomponent");
const html = require("bel");
const cn = require("classnames");

class Modal extends Nanocomponent {
  constructor (opts) {
    super();
    opts = Object.assign({}, opts);

    this.state = {};
    this.emit = null;

    // debounce state
    this.emailForm = "";
    this.passwordForm = "";
    this.confirmPasswordForm = "";
    this.nameForm = "";
  }

  createElement (state, emit) {
    this.state = state;
    this.emit = emit;

    if (this.state.open) {
      return layout(state, emit);
    } else {
      return placeHolder();
    }
  }

  update (state, emit) {
    // always re-render
    return true;
  }
}

function placeHolder () {
  return html`
    <div><!-- NetlifyIdentity --></div>
  `;
}

function formRouter ({ page }, emit) {
  switch (page) {
    case "login":
      return loginForm();
    case "signup":
      return signupForm();
  }
}

function layout ({ page }, emit) {
  return html`
      <div class="${styles.modalBackground}">
        <div class="${styles.modalWindow}">
          ${header({ page }, emit)}
          ${formRouter({ page })}
          ${providers()}
          ${footer(emit)}
        </div>
      </div>
    `;
}

function loginForm (value, oninput) {
  return html`
    <form class="${styles.form}">
      <label>Email <input type="text"/></label>
      <label>Password <input type="text"/></label>
    </form>
  `;
}

function signupForm (value, oninput) {
  return html`
    <form class="${styles.form}">
      <label>Name <input type="text"/></label>
      <label>Email <input type="text"/></label>
      <label>Password <input type="text"/></label>
      <label>Confirm Password <input type="text"/></label>
    </form>
  `;
}

function header ({ page }, emit) {
  const loginClass = cn({ active: page === "login" });
  const signupClass = cn({ active: page === "signup" });

  function navigateLoginPage () {
    emit("navigate", "login");
  }

  function navigateSignupPage () {
    emit("navigate", "signup");
  }
  return html`
  <div>
    <button class="${loginClass}" onclick=${navigateLoginPage}>Login</button>
    <button class="${signupClass}" onclick=${navigateSignupPage}>Signup</button>
  </div>
  `;
}

function providers () {
  return html`
    <ul>
      <li>Github</li>
      <li>Google</li>
    </ul>
  `;
}

function footer (emit) {
  function close () {
    emit("close");
  }

  return html`
    <div>
      <button onclick=${close}>close</button>
    </div>
  `;
}

module.exports = Modal;
