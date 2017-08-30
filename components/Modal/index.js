const styles = require("../styles.csjs");
const Nanocomponent = require("nanocomponent");
const html = require("bel");
const Header = require("./header");

class Modal extends Nanocomponent {
  constructor (opts) {
    super();
    opts = Object.assign({}, opts);

    this.state = {};
    this.emit = null;

    this.header = new Header();
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
    // always re-render
    return true;
  }

  layout ({ page }, emit) {
    return html`
        <div class="${styles.modalBackground}">
          <div class="${styles.modalWindow}">
            ${this.header.render({ page }, emit)}
            ${this.formRouter({ page })}
            ${providers()}
            ${footer(emit)}
          </div>
        </div>
      `;
  }

  formRouter ({ page }, emit) {
    switch (page) {
      case "login":
        return loginForm();
      case "signup":
        return signupForm();
    }
  }
}

function placeHolder () {
  return html`
    <div><!-- NetlifyIdentity --></div>
  `;
}

function loginForm (value, oninput) {
  return html`
    <form class="${styles.form}">
      <label>Email <input type="text"/></label>
      <label>Password <input type="text"/></label>
    </form>
  `;
}

function signupForm (value, oninput) {
  return html`
    <form class="${styles.form}">
      <label>Name <input type="text"/></label>
      <label>Email <input type="text"/></label>
      <label>Password <input type="text"/></label>
      <label>Confirm Password <input type="text"/></label>
    </form>
  `;
}

function providers () {
  return html`
    <ul>
      <li>Github</li>
      <li>Google</li>
    </ul>
  `;
}

function footer (emit) {
  function close () {
    emit("close");
  }

  return html`
    <div>
      <button onclick=${close}>close</button>
    </div>
  `;
}

module.exports = Modal;
