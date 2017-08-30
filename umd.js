// Autopilot tag based API
const NetlifyIdentity = require("./index.js");

const netlifyIdentity = new NetlifyIdentity({
  css: true // TODO: test if css is needed
});

module.exports = netlifyIdentity;

document.addEventListener("DOMContentLoaded", function (event) {
  init();
});

function init () {
  if (window.netlifyIdentity) {
    return console.warn("NetlifyIdentity: Identity widget already loaded");
  }

  const modalContainer = document.querySelector(
    'div[data-netlify-identity-modal=""]'
  );

  if (!modalContainer) {
    return console.warn(
      "NetlifyIdentity: Missing a modal container. Add a div to your HTML with the data-netlify-identity-modal attribute"
    );
  }

  if (!window.goTrue) {
    // TODO make a gotrue instance
  }

  netlifyIdentity.mount(modalContainer);
}
