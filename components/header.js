const styles = require("../styles.csjs");
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
    const { page } = state;
    this.page = page;
    this.emit = emit;

    const loginClass = cn({ [styles.active]: page === "login" });
    const signupClass = cn({ [styles.active]: page === "signup" });

    return html`
      <div class="${styles.header}">
        <button class="${loginClass}"
        onclick=${this.navigateLoginPage}>Login</button>
        <button class="${signupClass}"
        onclick=${this.navigateSignupPage}>Signup</button>
      </div>
    `;
  }

  update (state, emit) {
    const { page } = state;
    return this.page !== page;
  }
}

module.exports = Header;
