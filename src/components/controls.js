import { h, Component } from 'preact';
import { connect } from 'mobx-preact';

@connect(['modal'])
class Controls extends Component {
  handleSignup = (e) => {
    e.preventDefault();
    this.props.modal.open('signup');
  }

  handleLogin = (e) => {
    e.preventDefault();
    this.props.modal.open('login');
  }

  render() {
    return (
      <ul>
        <li><a href="#" onClick={this.handleSignup}>Sign Up</a></li>
        <li><a href="#" onClick={this.handleLogin}>Log in</a></li>
      </ul>
    )
  }
}

export default Controls;
