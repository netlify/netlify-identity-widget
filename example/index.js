const NetlifyIdentity = require("../index.js");

const identity = new NetlifyIdentity(
  {
    open: true
  },
  {}
);
window.identity = identity;

const container = document.querySelector("#external");

identity.mount(container);
