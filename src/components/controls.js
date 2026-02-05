import { h, Component } from "preact";
import { observer } from "../utils/observer";
import { StoreContext } from "../state/context";

class Controls extends Component {
  static contextType = StoreContext;

  get store() {
    return this.context;
  }

  handleSignup = (e) => {
    e.preventDefault();
    this.store.openModal("signup");
  };

  handleLogin = (e) => {
    e.preventDefault();
    this.store.openModal("login");
  };

  handleLogout = (e) => {
    e.preventDefault();
    this.store.openModal("user");
  };

  handleButton = (e) => {
    e.preventDefault();
    this.store.openModal(this.store.user ? "user" : "login");
  };

  render() {
    const { user, translate: t } = this.store;

    if (this.props.mode === "button") {
      return (
        <a
          className="netlify-identity-button"
          href="#"
          onClick={this.handleButton}
        >
          {this.props.text || (user ? t("log_out") : t("log_in"))}
        </a>
      );
    }

    if (user) {
      return (
        <ul className="netlify-identity-menu">
          <li className="netlify-identity-item netlify-identity-user-details">
            {t("logged_in_as")}{" "}
            <span className="netlify-identity-user">
              {user.user_metadata.name || user.email}
            </span>
          </li>
          <li className="netlify-identity-item">
            <a
              className="netlify-identity-logout"
              href="#"
              onClick={this.handleLogout}
            >
              {t("log_out")}
            </a>
          </li>
        </ul>
      );
    }

    return (
      <ul className="netlify-identity-menu">
        <li className="netlify-identity-item">
          <a
            className="netlify-identity-signup"
            href="#"
            onClick={this.handleSignup}
          >
            {t("sign_up")}
          </a>
        </li>
        <li className="netlify-identity-item">
          <a
            className="netlify-identity-login"
            href="#"
            onClick={this.handleLogin}
          >
            {t("log_in")}
          </a>
        </li>
      </ul>
    );
  }
}

export default observer(Controls);
