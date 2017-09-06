import { observable, action } from "mobx";

const identity = observable({
  user: null,
  message: null,
  settings: null,
  gotrue: null,
  error: null,
  siteURL: null,
  remember: true,
  saving: false
});

identity.init = action(function init(gotrue, reloadSettings) {
  if (gotrue) {
    identity.gotrue = gotrue;
    identity.user = gotrue.currentUser();
  }
  if (reloadSettings) { identity.loadSettings(); }
})

identity.loadSettings = action(function loadSettings() {
  if (identity.settings) { return; }
  if (!identity.gotrue) { return; }

  identity.gotrue.settings()
    .then(action((settings) => identity.settings = settings))
    .catch(action((err) => identity.error = err));
});

identity.setSiteURL = action(function setSiteURL(url) {
  identity.siteURL = url;
})

identity.login = action(function login(email, password) {
  return identity.gotrue.login(email, password, identity.remember)
    .then(action((user) => {
      identity.user = user;
      identity.token = null;
    }))
    .catch(action((error) => {
      identity.error = error;
    }));
})

identity.signup = action(function signup(name, email, password) {
  return identity.gotrue.signup(email, password, { full_name: name })
    .then((action((response) => {
      if (identity.settings.autoconfirm) {
        identity.login(email, password, identity.remember);
      } else {
        identity.message = "confirm";
      }
    })))
    .catch(action((error) => {
      identity.error = error;
    }))
})

identity.logout = action(function logout() {
  return identity.user && identity.user.logout().then(action(() => {
    identity.user = null;
  }));
})

identity.doEmailChange = action(function doEmailChange() {
  returnidentity.user
    .update({email_change_token: identity.token})
      .then(action((user) => {
        identity.user = user;
        identity.token = null;
        identity.message = "email_changed";
      }))
      .catch((err) => );
});

identity.verifyToken = action(function verifyToken(type, token) {
  const gotrue = identity.gotrue;
  identity.tokenFlow;
  switch(type) {
    case "confirmation":
      gotrue.confirm(token, identity.remember)
        .then(action((user) => identity.user = user))
        .catch(action((err) => identity.error = err));
      break;
    case "email_change":
      identity.token = token;
      if (identity.user) {
        identity.doEmailChange();
      }
    case "invite":
    case "recovery":
      identity.token = token;
      break;
    default:
      identity.error = "Unkown token type";
  }
});

export default identity;
