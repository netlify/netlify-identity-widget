import { observable, action, configure } from "mobx";
import { defaultLocale, getTranslation } from "../translations";
import type { Locale } from "../translations";
import type { Store, ModalPage, MessageType, Settings } from "./types";
import type { User } from "gotrue-js";
import type GoTrue from "gotrue-js";

// MobX 6 defaults to strict mode - disable it for compatibility with the existing store pattern
configure({ enforceActions: "never" });

// Define the base observable state
const baseStore = observable({
  user: null as User | null,
  recovered_user: null as User | null,
  message: null as MessageType,
  settings: null as Settings | null,
  gotrue: null as GoTrue | null,
  error: null as Error | string | null,
  siteURL: null as string | null,
  remember: true,
  saving: false,
  invite_token: null as string | null,
  email_change_token: null as string | null,
  namePlaceholder: null as string | null,
  signupMetadata: null as Record<string, unknown> | null,
  isLocal: false,
  modal: {
    page: "login" as ModalPage,
    isOpen: false,
    logo: true
  },
  locale: defaultLocale as Locale
});

// Cast to any to allow adding methods dynamically
const store = baseStore as unknown as Store;

store.setNamePlaceholder = action(function setNamePlaceholder(
  namePlaceholder: string | null
) {
  store.namePlaceholder = namePlaceholder;
});

store.startAction = action(function startAction() {
  store.saving = true;
  store.error = null;
  store.message = null;
});

store.setError = action(function setError(err?: Error | string) {
  store.saving = false;
  store.error = err ?? null;
});

store.init = action(function init(
  gotrue: GoTrue | null,
  reloadSettings?: boolean
) {
  if (gotrue) {
    store.gotrue = gotrue;
    store.user = gotrue.currentUser();
    if (store.user) {
      store.modal.page = "user";
      // Validate session server-side — if user was deleted, clear session
      store.user.getUserData().catch(
        action(() => {
          store.user = null;
          store.modal.page = "login";
          document.cookie =
            "nf_jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
        })
      );
    }
  }
  if (reloadSettings) {
    store.loadSettings();
  }
});

store.loadSettings = action(function loadSettings() {
  if (store.settings) {
    return;
  }
  if (!store.gotrue) {
    return;
  }

  store.gotrue
    .settings()
    .then(action((settings: Settings) => (store.settings = settings)))
    .catch(
      action(() => {
        store.error = new Error(
          `Failed to load settings from ${(store.gotrue as unknown as { api: { apiURL: string } }).api.apiURL}`
        );
      })
    );
});

store.setIsLocal = action(function setIsLocal(isLocal: boolean) {
  store.isLocal = isLocal;
});

store.setSiteURL = action(function setSiteURL(url: string) {
  store.siteURL = url;
});

store.clearSiteURL = action(function clearSiteURL() {
  store.gotrue = null;
  store.siteURL = null;
  store.settings = null;
});

store.login = action(function login(email: string, password: string) {
  store.startAction();
  return store
    .gotrue!.login(email, password, store.remember)
    .then(
      action((user: User) => {
        store.user = user;
        store.modal.page = "user";
        store.invite_token = null;
        if (store.email_change_token) {
          store.doEmailChange();
        }
        store.saving = false;
      })
    )
    .catch(store.setError);
});

store.externalLogin = action(function externalLogin(provider: string) {
  store.error = null;
  store.message = null;
  const url = store.invite_token
    ? store.gotrue!.acceptInviteExternalUrl(provider, store.invite_token)
    : store.gotrue!.loginExternalUrl(provider);
  window.location.href = url;
});

store.completeExternalLogin = action(function completeExternalLogin(
  params: Record<string, string>
) {
  store.startAction();
  store
    .gotrue!.createUser(params, store.remember)
    .then((user: User) => {
      store.user = user;
      store.modal.page = "user";
      store.saving = false;
    })
    .catch(store.setError);
});

store.signup = action(function signup(
  name: string,
  email: string,
  password: string
) {
  store.startAction();
  return store
    .gotrue!.signup(email, password, {
      ...store.signupMetadata,
      full_name: name
    })
    .then(
      action(() => {
        if (store.settings?.autoconfirm) {
          store.login(email, password);
        } else {
          store.message = "confirm";
        }
        store.saving = false;
      })
    )
    .catch(store.setError);
});

store.logout = action(function logout() {
  if (store.user) {
    store.startAction();
    return store.user
      .logout()
      .then(
        action(() => {
          store.user = null;
          store.modal.page = "login";
          store.saving = false;
          document.cookie =
            "nf_jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
        })
      )
      .catch(store.setError);
  } else {
    store.modal.page = "login";
    store.saving = false;
  }
});

store.updatePassword = action(function updatePassword(password: string) {
  store.startAction();
  const user = store.recovered_user || store.user;
  user!
    .update({ password })
    .then((updatedUser: User) => {
      store.user = updatedUser;
      store.recovered_user = null;
      store.modal.page = "user";
      store.saving = false;
    })
    .catch(store.setError);
});

store.acceptInvite = action(function acceptInvite(password: string) {
  store.startAction();
  store
    .gotrue!.acceptInvite(store.invite_token!, password, store.remember)
    .then((user: User) => {
      store.saving = false;
      store.invite_token = null;
      store.user = user;
      store.modal.page = "user";
    })
    .catch(store.setError);
});

store.doEmailChange = action(function doEmailChange() {
  store.startAction();
  return store
    .user!.update({ email_change_token: store.email_change_token })
    .then(
      action((user: User) => {
        store.user = user;
        store.email_change_token = null;
        store.message = "email_changed";
        store.saving = false;
      })
    )
    .catch(store.setError);
});

store.verifyToken = action(function verifyToken(type: string, token: string) {
  const gotrue = store.gotrue;
  store.modal.isOpen = true;

  switch (type) {
    case "confirmation":
      store.startAction();
      store.modal.page = "signup";
      gotrue!
        .confirm(token, store.remember)
        .then(
          action((user: User) => {
            store.user = user;
            store.saving = false;
          })
        )
        .catch(
          action((err: Error) => {
            console.error(err);
            store.message = "verfication_error";
            store.modal.page = "signup";
            store.saving = false;
          })
        );
      break;
    case "email_change":
      store.email_change_token = token;
      store.modal.page = "message";
      if (store.user) {
        store.doEmailChange();
      } else {
        store.modal.page = "login";
      }
      break;
    case "invite":
      store.modal.page = type as ModalPage;
      store.invite_token = token;
      break;
    case "recovery":
      store.startAction();
      store.modal.page = type as ModalPage;
      store
        .gotrue!.recover(token, store.remember)
        .then((user: User) => {
          store.saving = false;
          store.recovered_user = user;
        })
        .catch((err: Error) => {
          store.saving = false;
          store.error = err;
          store.modal.page = "login";
        });
      break;
    default:
      store.error = "Unknown token type";
  }
});

store.requestPasswordRecovery = action(function requestPasswordRecovery(
  email: string
) {
  store.startAction();
  store
    .gotrue!.requestPasswordRecovery(email)
    .then(
      action(() => {
        store.message = "password_mail";
        store.saving = false;
      })
    )
    .catch(store.setError);
});

store.openModal = action(function open(page: ModalPage) {
  store.modal.page = page;
  store.modal.isOpen = true;
});

store.closeModal = action(function close() {
  store.modal.isOpen = false;
  store.error = null;
  store.message = null;
  store.saving = false;
});

store.translate = action(function translate(key: string) {
  return getTranslation(key, store.locale);
});

export default store;
