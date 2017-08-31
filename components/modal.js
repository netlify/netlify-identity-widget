const styles = require("./styles.csjs");
const Nanocomponent = require("nanocomponent");
const html = require("bel");
const Header = require("./header");
const Providers = require("./providers");
const Footer = require("./footer");
const { SignupForm, LoginForm } = require("./forms");

class Modal extends Nanocomponent {
  constructor (opts) {
    super();
    opts = Object.assign({}, opts);

    this.state = {};
    this.emit = null;

    this.header = new Header();
    this.providers = new Providers();
    this.footer = new Footer();
    this.signupForm = new SignupForm();
    this.loginForm = new LoginForm();
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
    const { page, submitting, message } = state;
    return html`
        <div class="${styles.modalBackground}">
          <div class="${styles.modalWindow}">
            ${this.header.render({ page, disabled: submitting, message }, emit)}
            ${this.formRouter({ page, submitting }, emit)}
            ${this.providers.render()}
            ${this.footer.render({ submitting }, emit)}
          </div>
          <a href="https://www.netlify.com" class="${styles.callOut}">
            <span class="${styles.netlifyLogo}"></span>
            Coded by Netlify
          </a>
        </div>
      `;
  }

  formRouter (state, emit) {
    const { page, submitting } = state;
    if (!submitting) {
      switch (page) {
        case "login":
          return this.loginForm.render({}, emit);
        case "signup":
          return this.signupForm.render({}, emit);
        default:
          return html`<div>${page} missing</div>`;
      }
    } else {
      return html`<div>submitting</div>`;
    }
  }
}

function placeHolder () {
  return html`
    <div><!-- NetlifyIdentity --></div>
  `;
}

module.exports = Modal;
