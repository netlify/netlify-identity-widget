const styles = require("./styles.csjs");
const Nanocomponent = require("nanocomponent");
const html = require("bel");

class Title extends Nanocomponent {
  constructor () {
    super();
  }

  createElement (state, emit) {
    const { title } = state;
    this.title = title;
    
    return html`
      <div class="${styles.header}">
        <button class="${styles.btn} ${styles.btnHeader} ${styles.active}">${title}</button>
      </div>
    `;
  }

  update ({ title }, emit) {
    return this.title !== title;
  }
}

module.exports = Title;
