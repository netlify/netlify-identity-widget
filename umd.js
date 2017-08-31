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

  if (!netlifyIdentity.isMounted) {
    modalContainer.appendChild(netlifyIdentity.create());
  } else {
    console.warn(
      "NetlifyIdentity: two or more instances are running on the same page"
    );
  }
}
