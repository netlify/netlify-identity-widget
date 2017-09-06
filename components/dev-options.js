const styles = require("./styles.csjs");
const Nanocomponent = require("nanocomponent");
const html = require("bel");
const Title = require("./title");
const Flash = require("./flash");

class DevOptions extends Nanocomponent {
  constructor () {
    super();

    this.emit = null;

    this.netlifySiteURL = window.localStorage.getItem("netlifySiteURL") || "";

    this.title = new Title();
    this.flash = new Flash();

    this.handleSetOptions = this.handleSetOptions.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  createElement (state, emit) {
    this.emit = emit;

    return html`
      <div>
        ${this.title.render({ title: "Devopment Options" }, emit)}
        <form
          onsubmit=${this.handleSetOptions}
          class="${styles.form}">
          <div class="${styles.formGroup}">
            <label>
            <span class="${styles.visuallyHidden}">Enter your Site's URL</span>
            <input
                class="${styles.formControl}"
                type="url"
                name="netlifySiteURL"
                value="${this.netlifySiteURL}"
                placeholder="Netlify Site URL"
                required
                oninput=${this.handleInput}
            />
            <div class="${styles.inputFieldIcon} ${styles.inputFieldEmail}"></div>
            </label>
          </div>
            <Button
              type="submit"
              class="${styles.btn}">
              Save
            </Button>
        </form>
      </div>
    `;
  }

  update (state, emit) {
    return true;
  }

  handleInput (e) {
    this[e.target.name] = e.target.value;
  }

  handleSetOptions (e) {
    e.preventDefault();
    window.localStorage.setItem("netlifySiteURL", this.netlifySiteURL);
    window.location.reload();
  }
}

module.exports = DevOptions;
