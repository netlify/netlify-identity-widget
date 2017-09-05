const NetlifyIdentity = require("../index.js");

const identity = new NetlifyIdentity(
  { open: true }, // Gotrue identity options
  { APIUrl: `https://netlify-identity.netlify.com/.netlify/identity` } // Gotrue-js options
);
window.identity = identity;

const container = document.querySelector("#external");

identity.create(); // If you remove this from the DOM, you have to re-add it.

container.appendChild(identity.create());

identity.on("login", user => {
  document.querySelector(
    "#login-button"
  ).innerText = `Logged in as ${user.email}`;
});

identity.on("logout", user => {
  document.querySelector("#login-button").innerText = `Login with GoTrue`;
});
