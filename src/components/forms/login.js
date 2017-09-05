import {h, Component} from "preact";

export default class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {email: "", password: ""};
  }

  handleInput = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

  handleLogin = (e) => {
    e.preventDefault();
    this.props.onLogin(this.state.email, this.state.password);
  }

  render() {
    const {email, password} = this.state;

    return (
      <form onsubmit={this.handleLogin} className="form">
        <div className="formGroup">
          <label>
            <span className="visuallyHidden">
              Enter your email
            </span>
            <input
              className="formControl"
              type="email"
              name="email"
              value={email}
              placeholder="Email"
              autocapitalize="off"
              required
              oninput={this.handleInput}
            />
            <div className="inputFieldIcon inputFieldEmail"></div>
          </label>
        </div>
        <div className="formGroup">
          <label>
            <span className="visuallyHidden">
              Enter your password
            </span>
            <input
              className="formControl"
              type="password"
              name="password"
              value={password}
              placeholder="Password"
              required
              oninput={this.handleInput}
            />
            <div className="inputFieldIcon inputFieldPassword"></div>
          </label>
        </div>
        <button type="submit" className="btn">Log In</button>
      </form>
    )
  }
}
