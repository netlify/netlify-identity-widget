import netlifyIdentity from "./netlify-identity";

if (typeof exports !== undefined) {
  exports.netlifyIdentity = netlifyIdentity;
}
if (typeof window !== undefined) {
  window.netlifyIdentity = netlifyIdentity;
}
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    netlifyIdentity.init();
  });
} else {
  netlifyIdentity.init();
}
