const styles = require("./styles.csjs");
const Nanocomponent = require("nanocomponent");
const html = require("bel");
const cn = require("classnames");

class Header extends Nanocomponent {
  constructor () {
    super();

    this.page = "login";
    this.emit = null;

    this.navigateLoginPage = this.navigateLoginPage.bind(this);
    this.navigateSignupPage = this.navigateSignupPage.bind(this);
  }

  navigateLoginPage () {
    this.emit("navigate", { page: "login" });
  }

  navigateSignupPage () {
    this.emit("navigate", { page: "signup" });
  }

  createElement (state, emit) {
    const { page, settings, title } = state;
    this.disable_signup = settings.disable_signup;
    this.page = page;
    this.emit = emit;

    const loginClass = cn({ [styles.active]: page === "login" });
    const signupClass = cn({ [styles.active]: page === "signup" });

    return html`
      <div class="${styles.header}">
        ${settings.disable_signup
          ? ""
          : html`<button class="${styles.btn} ${styles.btnHeader} ${signupClass}"
            onclick=${this.navigateSignupPage}>Sign Up</button>`}
        <button class="${styles.btn} ${styles.btnHeader} ${loginClass}"
        onclick=${this.navigateLoginPage}>Log In</button>
      </div>
    `;
  }

  update ({ page, settings }, emit) {
    return this.page !== page || this.disable_signup !== settings.disable_signup;
  }
}

module.exports = Header;
