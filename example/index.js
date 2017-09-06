const NetlifyIdentity = require("../index.js");

const identity = new NetlifyIdentity(
  { open: true } // Gotrue identity options
);
window.identity = identity;

const container = document.querySelector("#external");

container.appendChild(identity.create());

identity.on("login", user => {
  document.querySelector(
    "#login-button"
  ).innerText = `Logged in as ${user.email}`;
});

identity.on("logout", user => {
  document.querySelector("#login-button").innerText = `Login with GoTrue`;
});
