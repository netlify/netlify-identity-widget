const styles = require("../styles.csjs");
const Nanocomponent = require("nanocomponent");
const html = require("bel");
const Header = require("../header");
const Providers = require("../providers");
const Footer = require("../footer");
const { SignupForm, LoginForm } = require("../forms");

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

    console.log(state.page);

    if (this.state.open) {
      return this.layout(state, emit);
    } else {
      return placeHolder();
    }
  }

  update (state, emit) {
    // always re-render
    return true;
  }

  layout ({ page }, emit) {
    return html`
        <div class="${styles.modalBackground}">
          <div class="${styles.modalWindow}">
            ${this.header.render({ page }, emit)}
            ${this.formRouter({ page })}
            ${this.providers.render()}
            ${this.footer.render(emit)}
          </div>
        </div>
      `;
  }

  formRouter ({ page }, emit) {
    switch (page) {
      case "login":
        return this.loginForm.render();
      case "signup":
        return this.signupForm.render();
    }
  }
}

function placeHolder () {
  return html`
    <div><!-- NetlifyIdentity --></div>
  `;
}

module.exports = Modal;
