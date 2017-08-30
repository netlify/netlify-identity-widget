const NetlifyIdentity = require("../index.js");

const identity = (window.identity = new NetlifyIdentity());

const container = document.querySelector("#external");

identity.mount(container);
