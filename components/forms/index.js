const styles = require("../styles.csjs");
const Nanocomponent = require("nanocomponent");
const html = require("bel");
// const cn = require("classnames");

class LoginForm extends Nanocomponent {
  createElement () {
    return html`
      <form class="${styles.form}">
        <div class="${styles.formGroup}">
          <label>Email</label>
        <input type="email"/>
        </div>
        <div class="${styles.formGroup}">
          <label>Password</label>
        <input type="password"/>
        </div>
        <button type="submit" value="Log in">Log in</button>
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
        <div class="${styles.formGroup}">
          <label>Name</label>
          <input type="text"/>
        </div>
        <div class="${styles.formGroup}">
          <label>Email</label>
        <input type="email"/>
        </div>
        <div class="${styles.formGroup}">
          <label>Password</label>
        <input type="password"/>
        </div>
      </form>
    `;
  }

  update () {
    return false;
  }
}

exports.SignupForm = SignupForm;
