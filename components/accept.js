const styles = require("./styles.csjs");
const Nanocomponent = require("nanocomponent");
const html = require("bel");
const cn = require("classnames");
const PasswordInput = require("./password");
const Flash = require("./flash");
const Title = require("./title");

class AcceptInviteForm extends Nanocomponent {
  constructor () {
    super();

    this.emit = null;

    this.handleSubmit = this.handleSubmit.bind(this);

    this.flash = new Flash();
    this.title = new Title();
    this.passwordInput = new PasswordInput();
  }

  createElement (state, emit) {
    this.emit = emit;
    this.state = state;

    const { submitting } = state;
    const disabledClass = cn({ [styles.disabled]: submitting });
    const savingClass = cn({ [styles.saving]: submitting });

    return html`
      <div>
        ${this.title.render({ title: "Respond to invite" }, emit)}
        ${this.flash.render(state, emit)}
        <form
          onsubmit=${this.handleSubmit}
          class="${styles.form} ${disabledClass}"
        >
          ${this.passwordInput.render(state, emit)}
          <button type="submit" class="${styles.btn} ${savingClass}">
            ${submitting ? "Accepting invite" : "Accept invite"}
          </button>
        </form>
      </div>
    `;
  }

  update () {
    return true;
  }

  handleInput (e) {
    this[e.target.name] = e.target.value;
  }

  handleSubmit (e) {
    e.preventDefault();

    this.emit("submit-invite", {
      password: this.passwordInput.password
    });

    this.rerender();
  }
}

module.exports = AcceptInviteForm;