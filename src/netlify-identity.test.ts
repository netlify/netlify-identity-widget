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
  });
});
