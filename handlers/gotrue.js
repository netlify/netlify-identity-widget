const queryString = require("query-string");

module.exports = goTrueHandlers;

function goTrueHandlers (state, emitter, goTrue) {
  emitter.on("init", () => {
    state.loading = true;
    emitter.emit("render");

    goTrue
      .settings()
      .then(settings => {
        state.settings = settings;
        emitter.emit("render");
      })
      .then(() => {
        const remember = true;
        const parsedHash = queryString.parse(window.location.hash);
        if (parsedHash.error) {
          window.location.hash = "";
          state.error = `Error ${parsedHash.error}: ${parsedHash.error_description}`;
          emitter.emit("error", new Error(parsedHash.error_description));
          return Promise.resolve();
        }

        if (parsedHash.confirmation_token) {
          window.location.hash = "";
          return goTrue
            .confirm(parsedHash.confirmation_token, remember)
            .then(user => {
              state.success = `Logged in ${user.email}`;
              state.page = "logout";
              state.user = user;
              emitter.emit("render");
              emitter.emit("login", user);
            })
            .catch(err => {
              state.error = `Failed to confirm email ${err.message}`;
              emitter.emit("error", err);
            });
        }

        if (parsedHash.recovery_token) {
          window.location.hash = "";
          state.page = "recover";
          state.token = parsedHash.recovery_token;
          state.open = true;
          return Promise.resolve();
        }

        if (parsedHash.invite_token) {
          window.location.hash = "";
          state.page = "accept";
          state.token = parsedHash.invite_token;
          state.open = true;
          return Promise.resolve();
        }

        if (parsedHash.email_change_token) {
          const user = goTrue.currentUser();
          if (!user) {
            state.error = `Must sign in before confirming email change`;
            state.page = "login";
            emitter.emit("render");
            return Promise.resolve();
          }
          emitter.emit("change-email", parsedHash.email_change_token);
          return Promise.resolve();
        }

        if (parsedHash.access_token) {
          window.location.hash = "";

          return goTrue
            .createUser(parsedHash, remember)
            .then(user => {
              state.success = `Logged in ${user.email}`;
              state.page = "logout";
              state.user = user;
              emitter.emit("render");
              emitter.emit("login", user);
            })
            .catch(err => {
              state.error = `Failed to login ${err.message}`;
              emitter.emit("error", err);
            });
        }

        return Promise.resolve();
      })
      .then(() => {
        state.loading = false;
        emitter.emit("render");
      });
  });

  emitter.on("change-email", email_change_token => {
    window.location.hash = "";
    goTrue
      .currentUser()
      .update({ email_change_token: email_change_token })
      .then(user => {
        state.success = "Email change was successful";
        state.user = user;
      })
      .catch(err => {
        state.error = `Failed to change email ${err.message}`;
        emitter.emit("error", err);
      });
  });

  emitter.on("submit-signup", ({ email, password, name }) => {
    state.submitting = true;
    emitter.emit("render");
    goTrue.signup(email, password, { full_name: name }).then(
      response => {
        if (state.settings.autoconfirm) {
          emitter.emit("signup", response);
          emitter.emit("submit-login", { email, password });
          return;
        }
        state.success = `Confirmation email sent to ${email}`;
        state.submitting = false;
        emitter.emit("render");
        emitter.emit("signup", response);
      },
      error => {
        state.error =
          (error.json && error.json.error_description) ||
          "We couldn’t sign you up";
        state.submitting = false;
        emitter.emit("render");
        emitter.emit("error", error);
      }
    );
  });

  emitter.on("submit-invite", ({ password }) => {
    state.submitting = true;
    emitter.emit("render");
    const remember = true;
    goTrue.acceptInvite(state.token, password, remember).then(
      user => {
        state.success = "Invite accepted";
        state.submitting = false;
        state.user = user;
        state.page = "logout";
        emitter.emit("render");
        emitter.emit("signup", user);
        emitter.emit("login", user);
      },
      error => {
        state.error = `Failed to verify ${error && error.message}`;
        state.submitting = false;
        emitter.emit("render");
        emitter.emit("error", error);
      }
    );
  });

  emitter.on("submit-recover", ({ password }) => {
    state.submitting = true;
    emitter.emit("render");
    const remember = true;
    goTrue
      .recover(state.token, remember)
      .then(user => {
        // even if the password change fails, user is still logged in.
        state.user = user;
        state.page = "logout";
        return user.update({ password });
      })
      .then(user => {
        state.success = "Password changed";
        state.submitting = false;
        state.user = user;
        state.page = "logout";
        emitter.emit("render");
        emitter.emit("login", user);
      })
      .catch(error => {
        state.error = `Failed to change password ${error && error.message}`;
        state.submitting = false;
        emitter.emit("render");
        emitter.emit("error", error);
      });
  });

  emitter.on("submit-login", ({ email, password }) => {
    state.submitting = true;
    emitter.emit("render");
    const remember = true;
    goTrue.login(email, password, remember).then(
      user => {
        state.success = `Successfully logged in!`;
        state.submitting = false;
        state.page = "logout";
        state.user = user;
        emitter.emit("render");
        emitter.emit("login", user);
        const parsedHash = queryString.parse(window.location.hash);
        if (parsedHash.email_change_token) {
          emitter.emit("change-email", parsedHash.email_change_token);
        }
      },
      error => {
        state.error =
          error && error.json && error.json.error === "invalid_grant"
            ? "Wrong email or password."
            : (error && error.message) || "We couldn’t log you in";
        state.submitting = false;
        emitter.emit("render");
        emitter.emit("error", error);
      }
    );
  });

  emitter.on("external-login", ({ provider }) => {
    const url = goTrue.loginExternalUrl(provider);
    window.location.href = url;
  });

  emitter.on("submit-logout", () => {
    state.submitting = true;
    emitter.emit("render");

    const user = goTrue.currentUser();
    if (user) {
      user.logout().then(() => {
        state.submitting = false;
        state.page = "login";
        state.user = null;
        state.success = "Logged out";
        emitter.emit("logout");
        emitter.emit("render");
      });
    }
  });

  emitter.on("submit-forgot", ({ email }) => {
    state.submitting = true;
    emitter.emit("render");

    goTrue
      .requestPasswordRecovery(email)
      .then(() => {
        state.submitting = false;
        state.success = `Password recovery email sent to ${email}`;
        state.page = "login";
        emitter.emit("render");
      })
      .catch(error => {
        state.submitting = false;
        state.error = `Error requesting password recovery: ${error &&
          error.message}`;
        emitter.emit("render");
      });
  });
}
