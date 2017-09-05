import { h, Component } from 'preact';

export default class LogoutForm {
  handleLogout = (e) => {
    e.preventDefault();
    this.props.onLogout();
  }
  render() {
    const {user} = this.props;

    return (
      <form onSubmit={this.handleLogout} className="form">
        <p>
          Logged in {user.email ? "as " : ""} {user.email}
        </p>
        <button type="submit" className="btn">Log out</button>
      </form>
    );
  }
}
