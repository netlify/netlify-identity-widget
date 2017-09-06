import { h, Component } from 'preact';
import { connect } from 'mobx-preact';

@connect(['store'])
class Controls extends Component {
  handleSignup = (e) => {
    e.preventDefault();
    this.props.store.openModal('signup');
  }

  handleLogin = (e) => {
    e.preventDefault();
    this.props.store.openModal('login');
  }

  handleLogout = (e) => {
    e.preventDefault();
    this.props.store.openModal('user');
  }

  render() {
    const {user} = this.props.store;

    if (user) {
      return (
        <ul>
          <li>Logged in as <span className="netlify-user">{user.user_metadata.name || user.email}</span></li>
          <li><a href="#" onClick={this.handleLogout}>Log out</a></li>
        </ul>
      );
    }

    return (
      <ul>
        <li><a href="#" onClick={this.handleSignup}>Sign Up</a></li>
        <li><a href="#" onClick={this.handleLogin}>Log in</a></li>
      </ul>
    )
  }
}

export default Controls;
