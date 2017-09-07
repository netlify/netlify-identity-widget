import { h, Component } from "preact";
import Message from "./message";
import Button from "./button";

export default class UserForm extends Component {
  constructor(props) {
    super(props);
    this.state = { name: "", email: "", password: "" };
  }

  handleInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleLogin = e => {
    e.preventDefault();
    this.props.onSubmit(this.state);
  };

  render() {
    const { page, message, saving } = this.props;
    const { name, email, password } = this.state;

    return (
      <form
        onsubmit={this.handleLogin}
        className={`form ${saving ? "disabled" : ""}`}
      >
        {message && <Message type={message} />}
        {page.name && (
          <div className="formGroup">
            <label>
              <span className="visuallyHidden">Enter your name</span>
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
              <div className="inputFieldIcon inputFieldEmail" />
            </label>
          </div>
        )}
        {page.email && (
          <div className="formGroup">
            <label>
              <span className="visuallyHidden">Enter your email</span>
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
              <div className="inputFieldIcon inputFieldEmail" />
            </label>
          </div>
        )}
        {page.password && (
          <div className="formGroup">
            <label>
              <span className="visuallyHidden">Enter your password</span>
              <input
                className="formControl"
                type="password"
                name="password"
                value={password}
                placeholder="Password"
                required
                oninput={this.handleInput}
              />
              <div className="inputFieldIcon inputFieldPassword" />
            </label>
          </div>
        )}
        <Button
          saving={saving}
          text={page.button}
          saving_text={page.button_saving}
        />
      </form>
    );
  }
}
