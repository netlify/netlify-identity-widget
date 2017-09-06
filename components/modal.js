const styles = require("./styles.csjs");
const Nanocomponent = require("nanocomponent");
const html = require("bel");

const SignupForm = require("./signup");
const LoginForm = require("./login");
const LogoutForm = require("./logout");
const FormatPasswordForm = require("./forgot");
const RecoverPasswordForm = require("./recover");
const AcceptInviteForm = require("./accept");
const DevOptions = require("./dev-options");

class Modal extends Nanocomponent {
  constructor (opts) {
    super();
    opts = Object.assign({}, opts);

    this.state = {};
    this.emit = null;

    this.signupForm = new SignupForm();
    this.loginForm = new LoginForm();
    this.logoutForm = new LogoutForm();
    this.forgotPasswordForm = new FormatPasswordForm();
    this.recoverPasswordForm = new RecoverPasswordForm();
    this.acceptInviteForm = new AcceptInviteForm();
    this.devOptions = new DevOptions();

    this.close = this.close.bind(this);
    this.openDevSettings = this.openDevSettings.bind(this);
  }

  close () {
    this.emit("close");
  }

  openDevSettings () {
    this.emit("navigate", { page: "dev-options" });
  }

  forgotPassword () {
    this.emit("navigate", { page: "forgot" });
  }

  createElement (state, emit) {
    this.state = state;
    this.emit = emit;

    if (this.state.open) {
      return this.layout(state, emit);
    } else {
      return placeHolder();
    }
  }

  update (state, emit) {
    return true;
  }

  layout (state, emit) {
    return html`
      <div class="${styles.modalContainer}" role="dialog">
        <div class="${styles.modalDialog}">
          <div class="${styles.modalContent}">
            <button onclick=${this.close}
                    class="${styles.btn} ${styles.btnClose}">
              <span class="${styles.visuallyHidden}">Close</span>
            </button>
            ${this.pageRouter(state, emit)}
            ${this.devModeButton(state.devMode, state.page)}
          </div>
        </div>
        <a href="https://www.netlify.com" class="${styles.callOut}">
          <span class="${styles.netlifyLogo}"></span>
          Coded by Netlify
        </a>
      </div>
    `;
  }

  devModeButton (isDevMode, page) {
    return isDevMode && page !== "dev-options"
      ? html`<button class="${styles.btn}"
      onclick="${this.openDevSettings}">🔧</button>`
      : "";
  }

  pageRouter (state, emit) {
    const { page } = state;
    switch (page) {
      case "login":
        return this.loginForm.render(state, emit);
      case "signup":
        return this.signupForm.render(state, emit);
      case "accept":
        return this.acceptInviteForm.render(state, emit);
      case "recover":
        return this.recoverPasswordForm.render(state, emit);
      case "logout":
        return this.logoutForm.render(state, emit);
      case "forgot":
        return this.forgotPasswordForm.render(state, emit);
      case "dev-options":
        return this.devOptions.render(state, emit);
      default:
        return html`<div>404 – Not found</div>`;
    }
  }
}

function placeHolder () {
  return html`
    <div><!-- NetlifyIdentity --></div>
  `;
}

module.exports = Modal;
