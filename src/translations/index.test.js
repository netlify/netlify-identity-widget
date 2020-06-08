describe("translations", () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it("should return translation for default locale", () => {
    const { getTranslation } = require("./");
    expect(getTranslation("log_in")).toEqual("Log in");
  });

  it("should return translation for 'en' locale", () => {
    const { getTranslation } = require("./");
    expect(getTranslation("log_in", "en")).toEqual("Log in");
  });

  it("should return translation for 'fr' locale", () => {
    const { getTranslation } = require("./");
    expect(getTranslation("log_in", "fr")).toEqual("Connexion");
  });

  it("should return key for non existing translation", () => {
    const { getTranslation } = require("./");
    expect(getTranslation("unknown_key")).toEqual("unknown_key");
  });

  it("should default to 'en' on missing key", () => {
    jest.mock("./en.json", () => ({ log_in: "Log in" }));
    jest.mock("./fr.json", () => ({}));

    const { getTranslation } = require("./");
    expect(getTranslation("log_in")).toEqual("Log in");
    expect(getTranslation("log_in", "fr")).toEqual("Log in");
  });
});
