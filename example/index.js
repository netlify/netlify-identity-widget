const NetlifyIdentity = require("../index.js");

const identity = new NetlifyIdentity();
window.identity = identity;

const container = document.querySelector("#external");

identity.mount(container);
