const styles = require("../styles.csjs");
const Nanocomponent = require("nanocomponent");
const html = require("bel");
// const cn = require("classnames");

class LoginForm extends Nanocomponent {
  createElement () {
    return html`
      <form class="${styles.form}">
        <label><span class="${styles.form}">Email</span><input type="text"/></label>
        <label><span class="${styles.form}">Password</span><input type="text"/></label>
      </form>
    `;
  }

  update () {
    return false;
  }
}

exports.LoginForm = LoginForm;

class SignupForm extends Nanocomponent {
  createElement () {
    return html`
      <form class="${styles.form}">
        <label>Name <input type="text"/></label>
        <label>Email <input type="text"/></label>
        <label>Password <input type="text"/></label>
      </form>
    `;
  }

  update () {
    return false;
  }
}

exports.SignupForm = SignupForm;
