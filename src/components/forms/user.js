import {h, Component} from "preact";

export default class UserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {name: "", email: "", password: ""};
  }

  handleInput = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

  handleLogin = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.state);
  }

  render() {
    const {page} = this.props;
    const {name, email, password} = this.state;
    const showName = page === 'signup';
    const showEmail = page === 'login' || page === 'signup';

    return (
      <form onsubmit={this.handleLogin} className="form">
        {showName && <div className="formGroup">
          <label>
            <span className="visuallyHidden">
              Enter your name
            </span>
            <input
              className="formControl"
              type="name"
              name="name"
              value={name}
              placeholder="Name"
              autocapitalize="off"
              required
              oninput={this.handleInput}
            />
            <div className="inputFieldIcon inputFieldEmail"></div>
          </label>
        </div>}
        {showEmail && <div className="formGroup">
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
        </div>}
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
