const NetlifyIdentity = require("../index.js");

const identity = new NetlifyIdentity(
  { open: true },
  { APIUrl: `https://netlify-identity.netlify.com/.netlify/identity` }
);
window.identity = identity;

const container = document.querySelector("#external");

container.appendChild(identity.create()); // If you remove this from the DOM, you have to re-add it.
