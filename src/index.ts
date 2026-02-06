import netlifyIdentity from "./netlify-identity";

declare global {
  interface Window {
    netlifyIdentity: typeof netlifyIdentity;
  }
}

if (typeof window !== "undefined") {
  window.netlifyIdentity = netlifyIdentity;
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    netlifyIdentity.init();
  });
} else {
  netlifyIdentity.init();
}

export default netlifyIdentity;
