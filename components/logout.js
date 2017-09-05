const styles = require("./styles.csjs");
const Nanocomponent = require("nanocomponent");
const html = require("bel");
const cn = require("classnames");
const Title = require("./title");
const Flash = require("./flash");

class LogoutForm extends Nanocomponent {
  constructor () {
    super();

    this.emit = null;

    this.handleLogout = this.handleLogout.bind(this);
    this.title = new Title();
    this.flash = new Flash();
  }

  createElement (state, emit) {
    this.emit = emit;

    const { submitting, user } = state;
    const disabledClass = cn({ [styles.disabled]: submitting });
    const savingClass = cn({ [styles.saving]: submitting });
    const email = (user && user.email) || "";

    return html`
      <div>
        ${this.title.render({ title: "Logged in" }, emit)}
        ${this.flash.render(state, emit)}
        <form
          onsubmit=${this.handleLogout}
          class="${styles.form} ${disabledClass}"
        >
          <p class="${styles.infoText}">
            Logged in ${email ? "as " : ""} <br /><span class="${styles.infoTextEmail}">${email}</span>
          </p>
            <Button
              type="submit"
              class="${styles.btn} ${savingClass}"
            >
              Log out
            </Button>
        </form>
      </div>
    `;
  }

  update (state, emit) {
    return true;
  }

  handleLogout (e) {
    e.preventDefault();

    this.emit("submit-logout");

    this.rerender();
  }
}

module.exports = LogoutForm;