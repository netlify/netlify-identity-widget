import { h, Component } from "preact";
import { connect } from "mobx-preact";

@connect(["store"])
class Controls extends Component {
  handleSignup = (e) => {
    e.preventDefault();
    this.props.store.openModal("signup");
  };

  handleLogin = () => {
    this.props.store.openModal("login");
  };

  handleLogout = () => {
    this.props.store.openModal("user");
  };

  handleButton = () => {
    this.props.store.openModal(this.props.store.user ? "user" : "login");
  };

  render() {
    const { user, translate: t } = this.props.store;

    if (this.props.mode === "button") {
      return (
        <button
          type="button"
          className="netlify-identity-button"
          onClick={this.handleButton}
        >
          {this.props.text || (user ? t("log_out") : t("log_in"))}
        </button>
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
            <button
              type="button"
              className="netlify-identity-logout"
              onClick={this.handleLogout}
            >
              {t("log_out")}
            </button>
          </li>
        </ul>
      );
    }

    return (
      <ul className="netlify-identity-menu">
        <li className="netlify-identity-item">
          <button
            type="button"
            className="netlify-identity-signup"
            onClick={this.handleSignup}
          >
            {t("sign_up")}
          </button>
        </li>
        <li className="netlify-identity-item">
          <button
            type="button"
            className="netlify-identity-login"
            onClick={this.handleLogin}
          >
            {t("log_in")}
          </button>
        </li>
      </ul>
    );
  }
}

export default Controls;
