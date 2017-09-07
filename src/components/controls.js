import { h, Component } from "preact";
import { connect } from "mobx-preact";

@connect(["store"])
class Controls extends Component {
  handleSignup = e => {
    e.preventDefault();
    this.props.store.openModal("signup");
  };

  handleLogin = e => {
    e.preventDefault();
    this.props.store.openModal("login");
  };

  handleLogout = e => {
    e.preventDefault();
    this.props.store.openModal("user");
  };

  handleButton = e => {
    e.preventDefault();
    this.props.store.openModal(this.props.store.user ? "user" : "login");
  };

  render() {
    const { user } = this.props.store;

    if (this.props.mode === "button") {
      return (
        <a
          className="netlify-identity-button"
          href="#"
          onClick={this.handleButton}
        >
          {this.props.text || (user ? "Log out" : "Log in")}
        </a>
      );
    }

    if (user) {
      return (
        <ul className="netlify-identity-menu">
          <li className="netlify-identity-item netlify-identity-user-details">
            Logged in as{" "}
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
              Log out
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
            Sign up
          </a>
        </li>
        <li className="netlify-identity-item">
          <a
            className="netlify-identity-login"
            href="#"
            onClick={this.handleLogin}
          >
            Log in
          </a>
        </li>
      </ul>
    );
  }
}

export default Controls;
