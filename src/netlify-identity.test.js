jest.mock("./components/modal.css", () => "");

describe("netlifyIdentity", () => {
  beforeEach(() => {
    jest.resetModules();
    jest.mock("./state/store", () => {
      const { observable } = require("mobx");
      const store = observable({
        user: null,
        recovered_user: null,
        message: null,
        settings: null,
        gotrue: null,
        error: null,
        siteURL: null,
        remember: true,
        saving: false,
        invite_token: null,
        email_change_token: null,
        namePlaceholder: null,
        modal: {
          page: "login",
          isOpen: false,
          logo: true
        },
        locale: "en"
      });
      return store;
    });
  });

  describe("on", () => {
    it("should invoke login callback when user is set to an object", () => {
      const store = require("./state/store");
      const { default: netlifyIdentity } = require("./netlify-identity");

      const loginCallback = jest.fn();
      netlifyIdentity.on("login", loginCallback);

      store.user = {
        name: "user"
      };

      expect(loginCallback).toHaveBeenCalledTimes(1);
      expect(loginCallback).toHaveBeenCalledWith({ name: "user" });
    });

    it("should invoke logout callback when user is set to null", () => {
      const store = require("./state/store");
      store.user = {
        name: "user"
      };

      const { default: netlifyIdentity } = require("./netlify-identity");

      const logoutCallback = jest.fn();
      netlifyIdentity.on("logout", logoutCallback);

      store.user = null;

      expect(logoutCallback).toHaveBeenCalledTimes(1);
    });

    it("should not invoke login callback when user is set to null", () => {
      const store = require("./state/store");
      store.user = {
        name: "user"
      };

      const { default: netlifyIdentity } = require("./netlify-identity");

      const loginCallback = jest.fn();
      netlifyIdentity.on("login", loginCallback);

      store.user = null;

      expect(loginCallback).toHaveBeenCalledTimes(0);
    });

    it("should not invoke logout callback when user is set to an object", () => {
      const store = require("./state/store");
      store.user = null;

      const { default: netlifyIdentity } = require("./netlify-identity");

      const loginCallback = jest.fn();
      netlifyIdentity.on("logout", loginCallback);

      store.user = {
        name: "user"
      };

      expect(loginCallback).toHaveBeenCalledTimes(0);
    });
  });

  describe("off", () => {
    it("should not throw when an unregistered callback is removed", () => {
      const { default: netlifyIdentity } = require("./netlify-identity");

      expect(() => netlifyIdentity.off("login", () => undefined)).not.toThrow();
    });

    it("should remove all callbacks when called with only first argument", () => {
      const store = require("./state/store");
      const { default: netlifyIdentity } = require("./netlify-identity");

      const loginCallback1 = jest.fn();
      const loginCallback2 = jest.fn();

      netlifyIdentity.on("login", loginCallback1);
      netlifyIdentity.on("login", loginCallback2);

      store.user = {
        name: "user"
      };

      expect(loginCallback1).toHaveBeenCalledTimes(1);
      expect(loginCallback2).toHaveBeenCalledTimes(1);

      loginCallback1.mockClear();
      loginCallback2.mockClear();

      netlifyIdentity.off("login");

      store.user = {
        name: "other user"
      };

      expect(loginCallback1).toHaveBeenCalledTimes(0);
      expect(loginCallback2).toHaveBeenCalledTimes(0);
    });

    it("should remove a specific callback when called with two arguments", () => {
      const store = require("./state/store");
      const { default: netlifyIdentity } = require("./netlify-identity");

      const loginCallback1 = jest.fn();
      const loginCallback2 = jest.fn();

      netlifyIdentity.on("login", loginCallback1);
      netlifyIdentity.on("login", loginCallback2);

      store.user = {
        name: "user"
      };

      expect(loginCallback1).toHaveBeenCalledTimes(1);
      expect(loginCallback2).toHaveBeenCalledTimes(1);

      loginCallback1.mockClear();
      loginCallback2.mockClear();

      netlifyIdentity.off("login", loginCallback1);

      store.user = {
        name: "other user"
      };

      expect(loginCallback1).toHaveBeenCalledTimes(0);
      expect(loginCallback2).toHaveBeenCalledTimes(1);
    });
  });
});
