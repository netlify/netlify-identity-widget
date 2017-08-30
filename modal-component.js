import styles from "./styles.csjs";
import Nanocomponent from "nanocomponent";
import html from "bel";

export default class IdentityModal extends Nanocomponent {
  constructor (opts, emit) {
    super();
    opts = Object.assign({}, opts);

    this.emit = emit;
    this.modalOpen = false;
    this.modalPage = "login";

    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.navigateLoginPage = this.navigate.bind(this, "login");
    this.navigateSignupPage = this.navigate.bind(this, "signup");
  }

  createElement () {
    if (this.modalOpen) {
      return this.router(this.modalPage);
    } else {
      return this.placeHolder();
    }
  }

  update () {
    // always re-render
    return true;
  }

  router (modalPage) {
    switch (modalPage) {
      case "login": {
        return this.loginPage();
      }
      case "signup": {
        return this.signupPage();
      }
    }
  }

  navigate (page) {
    this.modalPage = page;
    this.render();
  }

  open () {
    this.modalOpen = true;
    this.render();
  }

  close () {
    this.modalOpen = false;
    this.render();
  }

  signupPage () {
    return html`
      <div class="${styles.modalBackground}">
        <div class="${styles.modalWindow}">
          <div>hi im the signup page</div>
          <div>
            <button onclick=${this.navigateLoginPage}>Login</button>
            <button onclick=${this.navigateSignupPage}>Signup</button>
            <button onclick=${this.close}>close</button>
          </div>
        </div>
      </div>
    `;
  }

  loginPage () {
    return html`
      <div class="${styles.modalBackground}">
        <div class="${styles.modalWindow}">
          <div>hi im the login page</div>
          <div>
            <button onclick=${this.navigateLoginPage}>Login</button>
            <button onclick=${this.navigateSignupPage}>Signup</button>
            <button onclick=${this.close}>close</button>
          </div>
        </div>
      </div>
    `;
  }

  placeHolder () {
    return html`
      <div><!-- NetlifyIdentity --></div>
    `;
  }
}
