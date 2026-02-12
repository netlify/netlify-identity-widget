import { vi, describe, it, expect, beforeEach } from "vitest";
import type { User } from "gotrue-js";

vi.mock("./components/modal.css?inline", () => ({ default: "" }));
vi.mock("gotrue-js", () => {
  // Use a class to allow `new GoTrue(...)` syntax
  class MockGoTrue {
    APIUrl: string;
    setCookie: boolean;
    settings = vi.fn().mockResolvedValue({
      external: {
        bitbucket: false,
        github: false,
        gitlab: false,
        google: false,
        facebook: false,
        email: true,
        saml: false
      },
      external_labels: {},
      disable_signup: false,
      autoconfirm: false
    });
    currentUser = vi.fn();

    constructor({
      APIUrl,
      setCookie
    }: {
      APIUrl?: string;
      setCookie?: boolean;
    }) {
      this.APIUrl = APIUrl || "";
      this.setCookie = setCookie ?? true;
    }
  }
  return { default: MockGoTrue };
});

// Helper to create mock user objects for tests
const createMockUser = (name: string): User => ({ name }) as unknown as User;

describe("netlifyIdentity", () => {
  beforeEach(() => {
    vi.resetModules();
    // Remove iframe created by init() so the duplicate-init guard doesn't block subsequent tests
    document.getElementById("netlify-identity-widget")?.remove();
  });

  describe("on", () => {
    it("should invoke login callback when user is set to an object", async () => {
      const { default: store } = await import("./state/store");
      const { default: netlifyIdentity } = await import("./netlify-identity");

      const loginCallback = vi.fn();
      netlifyIdentity.on("login", loginCallback);

      store.user = createMockUser("user");

      expect(loginCallback).toHaveBeenCalledTimes(1);
      expect(loginCallback).toHaveBeenCalledWith({ name: "user" });
    });

    it("should invoke logout callback when user is set to null", async () => {
      const { default: store } = await import("./state/store");
      store.user = createMockUser("user");

      const { default: netlifyIdentity } = await import("./netlify-identity");

      const logoutCallback = vi.fn();
      netlifyIdentity.on("logout", logoutCallback);

      store.user = null;

      expect(logoutCallback).toHaveBeenCalledTimes(1);
    });

    it("should not invoke login callback when user is set to null", async () => {
      const { default: store } = await import("./state/store");
      store.user = createMockUser("user");

      const { default: netlifyIdentity } = await import("./netlify-identity");

      const loginCallback = vi.fn();
      netlifyIdentity.on("login", loginCallback);

      store.user = null;

      expect(loginCallback).toHaveBeenCalledTimes(0);
    });

    it("should not invoke logout callback when user is set to an object", async () => {
      const { default: store } = await import("./state/store");
      store.user = null;

      const { default: netlifyIdentity } = await import("./netlify-identity");

      const loginCallback = vi.fn();
      netlifyIdentity.on("logout", loginCallback);

      store.user = createMockUser("user");

      expect(loginCallback).toHaveBeenCalledTimes(0);
    });
  });

  describe("off", () => {
    it("should not throw when an unregistered callback is removed", async () => {
      const { default: netlifyIdentity } = await import("./netlify-identity");

      expect(() => netlifyIdentity.off("login", () => undefined)).not.toThrow();
    });

    it("should remove all callbacks when called with only first argument", async () => {
      const { default: store } = await import("./state/store");
      const { default: netlifyIdentity } = await import("./netlify-identity");

      const loginCallback1 = vi.fn();
      const loginCallback2 = vi.fn();

      netlifyIdentity.on("login", loginCallback1);
      netlifyIdentity.on("login", loginCallback2);

      store.user = createMockUser("user");

      expect(loginCallback1).toHaveBeenCalledTimes(1);
      expect(loginCallback2).toHaveBeenCalledTimes(1);

      loginCallback1.mockClear();
      loginCallback2.mockClear();

      netlifyIdentity.off("login");

      store.user = createMockUser("other user");

      expect(loginCallback1).toHaveBeenCalledTimes(0);
      expect(loginCallback2).toHaveBeenCalledTimes(0);
    });

    it("should remove a specific callback when called with two arguments", async () => {
      const { default: store } = await import("./state/store");
      const { default: netlifyIdentity } = await import("./netlify-identity");

      const loginCallback1 = vi.fn();
      const loginCallback2 = vi.fn();

      netlifyIdentity.on("login", loginCallback1);
      netlifyIdentity.on("login", loginCallback2);

      store.user = createMockUser("user");

      expect(loginCallback1).toHaveBeenCalledTimes(1);
      expect(loginCallback2).toHaveBeenCalledTimes(1);

      loginCallback1.mockClear();
      loginCallback2.mockClear();

      netlifyIdentity.off("login", loginCallback1);

      store.user = createMockUser("other user");

      expect(loginCallback1).toHaveBeenCalledTimes(0);
      expect(loginCallback2).toHaveBeenCalledTimes(1);
    });
  });

  describe("init", () => {
    it("should only invoke init event once when on localhost and netlifySiteURL is set", async () => {
      // @ts-expect-error - mocking window.location for test
      window.location = { hostname: "localhost" };
      localStorage.setItem("netlifySiteURL", "https://my-site.netlify.app/");

      const { default: store } = await import("./state/store");
      const { default: netlifyIdentity } = await import("./netlify-identity");

      const initCallback = vi.fn();
      netlifyIdentity.on("init", initCallback);

      netlifyIdentity.init();

      expect(initCallback).toHaveBeenCalledTimes(1);
      expect(store.siteURL).toEqual("https://my-site.netlify.app/");
      expect((store.gotrue as unknown as { APIUrl: string }).APIUrl).toEqual(
        "https://my-site.netlify.app/.netlify/identity"
      );
      expect(
        (store.gotrue as unknown as { setCookie: boolean }).setCookie
      ).toEqual(false);
    });

    it("should disable server cookie when cookieDomain is set", async () => {
      const savedLocation = window.location;
      // @ts-expect-error - delete so we can replace with a plain mock object
      delete window.location;
      // @ts-expect-error - partial Location mock
      window.location = { hostname: "app.example.com", hash: "" };

      const { default: store } = await import("./state/store");
      const { default: netlifyIdentity } = await import("./netlify-identity");

      netlifyIdentity.init({
        APIUrl: "https://app.example.com/.netlify/identity",
        cookieDomain: ".example.com"
      });

      expect(store.cookieDomain).toEqual(".example.com");
      expect(
        (store.gotrue as unknown as { setCookie: boolean }).setCookie
      ).toEqual(false);

      window.location = savedLocation;
    });

    it("should enable server cookie when cookieDomain is not set", async () => {
      const savedLocation = window.location;
      // @ts-expect-error - delete so we can replace with a plain mock object
      delete window.location;
      // @ts-expect-error - partial Location mock
      window.location = { hostname: "app.example.com", hash: "" };

      const { default: store } = await import("./state/store");
      const { default: netlifyIdentity } = await import("./netlify-identity");

      netlifyIdentity.init({
        APIUrl: "https://app.example.com/.netlify/identity"
      });

      expect(store.cookieDomain).toBeNull();
      expect(
        (store.gotrue as unknown as { setCookie: boolean }).setCookie
      ).toEqual(true);

      window.location = savedLocation;
    });

    it("should reject cookieDomain containing semicolons", async () => {
      const { default: netlifyIdentity } = await import("./netlify-identity");

      expect(() =>
        netlifyIdentity.init({ cookieDomain: ".example.com; secure" })
      ).toThrow("Invalid cookieDomain");
    });

    it("should reject cookieDomain containing newlines", async () => {
      const { default: netlifyIdentity } = await import("./netlify-identity");

      expect(() =>
        netlifyIdentity.init({ cookieDomain: ".example.com\r\ninjected" })
      ).toThrow("Invalid cookieDomain");
    });
  });

  describe("setJwtCookie", () => {
    it("should set cookie with token", async () => {
      const { setJwtCookie } = await import("./state/store");

      setJwtCookie("test-token");

      expect(document.cookie).toContain("nf_jwt=test-token");
    });

    it("should clear cookie when called with null", async () => {
      const { setJwtCookie } = await import("./state/store");

      setJwtCookie("test-token");
      setJwtCookie(null);

      expect(document.cookie).not.toContain("nf_jwt=test-token");
    });

    it("should include domain attribute when cookieDomain is set", async () => {
      const { default: store, setJwtCookie } = await import("./state/store");
      const spy = vi.spyOn(document, "cookie", "set");

      store.cookieDomain = ".example.com";
      setJwtCookie("test-token");

      expect(spy).toHaveBeenCalledWith(
        expect.stringContaining("; domain=.example.com")
      );

      spy.mockRestore();
      store.cookieDomain = null;
    });

    it("should not include domain attribute when cookieDomain is not set", async () => {
      const { default: store, setJwtCookie } = await import("./state/store");
      const spy = vi.spyOn(document, "cookie", "set");

      store.cookieDomain = null;
      setJwtCookie("test-token");

      expect(spy).toHaveBeenCalledWith(
        expect.not.stringContaining("; domain=")
      );

      spy.mockRestore();
    });

    it("should include secure flag on HTTPS", async () => {
      const { setJwtCookie } = await import("./state/store");
      const spy = vi.spyOn(document, "cookie", "set");

      const savedLocation = window.location;
      // @ts-expect-error - delete so we can replace with a plain mock object
      delete window.location;
      // @ts-expect-error - partial Location mock
      window.location = { protocol: "https:" };

      setJwtCookie("test-token");

      expect(spy).toHaveBeenCalledWith(expect.stringContaining("; secure"));

      window.location = savedLocation;
      spy.mockRestore();
    });
  });
});
