const NetlifyIdentity = require("../index.js");

const identity = new NetlifyIdentity(
  { open: true }, // Gotrue identity options
  { APIUrl: `https://netlify-identity.netlify.com/.netlify/identity` } // Gotrue-js options
);

window.identity = identity;

identity.on("login", user => {
  document.querySelector(
    "#login-button"
  ).innerText = `Logged in as ${user.email}`;
});

identity.on("logout", user => {
  document.querySelector("#login-button").innerText = `Login with GoTrue`;
});
