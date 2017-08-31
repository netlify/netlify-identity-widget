const styles = require("./styles.csjs");
const Nanocomponent = require("nanocomponent");
const html = require("bel");
const cn = require("classnames");

class Header extends Nanocomponent {
  constructor () {
    super();

    this.page = "login";
    this.emit = "null";

    this.navigateLoginPage = this.navigateLoginPage.bind(this);
    this.navigateSignupPage = this.navigateSignupPage.bind(this);
  }
  navigateLoginPage () {
    this.emit("navigate", "login");
  }

  navigateSignupPage () {
    this.emit("navigate", "signup");
  }

  createElement (state, emit) {
    const { page, message, disabled } = state;
    this.page = page;
    this.emit = emit;
    this.message = message;
    this.disabled = disabled;

    const loginClass = cn({ [styles.active]: page === "login" });
    const signupClass = cn({ [styles.active]: page === "signup" });

    return html`
      <div class="${styles.header}">
        <div>
          <button disabled=${disabled} class="${loginClass}"
          onclick=${this.navigateLoginPage}>Login</button>
          <button disabled=${disabled} class="${signupClass}"
          onclick=${this.navigateSignupPage}>Signup</button>
          ${message ? html`<div>${message}</div>` : ""}
        </div>
      </div>
    `;
  }

  update (state, emit) {
    const { page, message, disabled } = state;
    if (this.page !== page) return true;
    if (this.message !== message) return true;
    if (this.disabled !== disabled) return true;
    return false;
  }
}

module.exports = Header;
