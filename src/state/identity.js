import { observable, action } from "mobx"


const identity = observable({
  user: null,
  settings: null,
  gotrue: null,
  error: null,
  loginError: null
});

identity.init = action(function init(gotrue) {
  identity.gotrue = gotrue;
  identity.user = gotrue.currentUser();
})

identity.loadSettings = action(function loadSettings() {
  if (identity.settings) { return; }

  identity.gotrue.settings()
    .then(action((settings) => identity.settings = settings))
    .catch(action((err) => identity.error = err));
});

identity.login = action(function login(email, password) {
  identity.gotrue.login(email, password, true)
    .then(action((user) => {
      identity.user = user;
    }))
    .catch(action((error) => {
      identity.loginError = error;
    }))
})

identity.logout = action(function logout() {
  identity.user && identity.user.logout().then(action(() => {
    identity.user = null;
  }));
})

export default identity;
