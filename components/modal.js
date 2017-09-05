const styles = require("./styles.csjs");
const Nanocomponent = require("nanocomponent");
const html = require("bel");
const Header = require("./header");
const Providers = require("./providers");
const Flash = require("./flash");
const { SignupForm, LoginForm, LogoutForm } = require("./forms");

class Modal extends Nanocomponent {
  constructor (opts) {
    super();
    opts = Object.assign({}, opts);

    this.state = {};
    this.emit = null;

    this.header = new Header();
    this.providers = new Providers();
    this.signupForm = new SignupForm();
    this.loginForm = new LoginForm();
    this.logoutForm = new LogoutForm();
    this.flash = new Flash();

    this.close = this.close.bind(this);
  }

  close () {
    this.emit("close");
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
            ${this.header.render(state, emit)}
            ${this.flash.render(state, emit)}
            ${this.formRouter(state, emit)}
            ${this.providers.render(state, emit)}
          </div>
        </div>
        <a href="https://www.netlify.com" class="${styles.callOut}">
          <span class="${styles.netlifyLogo}"></span>
          Coded by Netlify
        </a>
      </div>
    `;
  }

  formRouter (state, emit) {
    const { page } = state;
    switch (page) {
      case "login":
        return this.loginForm.render(state, emit);
      case "signup":
        // fallthrough
      case "accept":
        // fallthrough
      case "recover":
        return this.signupForm.render(state, emit);
      case "logout":
        return this.logoutForm.render(state, emit);
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
