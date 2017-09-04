// Autopilot tag based API
const NetlifyIdentity = require("./index.js");

const netlifyIdentity = new NetlifyIdentity();

module.exports = netlifyIdentity;

document.addEventListener("DOMContentLoaded", function (event) {
  init();
});

function init () {
  if (!window.netlifyIdentity) {
    window.netlifyIdentity = netlifyIdentity;
  }

  let modalContainer = document.querySelector(
    'div[data-netlify-identity-modal=""]'
  );

  if (!modalContainer) {
    modalContainer = document.createElement("div");
    document.body.appendChild(modalContainer);
  }

  if (!window.goTrue) {
    // TODO make a gotrue instance
  }

  if (!netlifyIdentity.isMounted) {
    netlifyIdentity.create().then(node => modalContainer.appendChild(node));
  } else {
    console.warn(
      "NetlifyIdentity: two or more instances are running on the same page"
    );
  }
}
