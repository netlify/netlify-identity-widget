import { h, Component } from "preact";

class Provider extends Component {
  handleLogin = e => {
    e.preventDefault();
    this.props.onLogin(this.props.provider.toLowerCase());
  };

  render() {
    const { provider } = this.props;

    return (
      <button
        onClick={this.handleLogin}
        className={`provider${provider} btn btnProvider`}
      >
        Continue with {provider}
      </button>
    );
  }
}

export default class Providers extends Component {
  render() {
    const { providers, onLogin } = this.props;

    return (
      <div className="providersGroup">
        <hr className="hr" />
        {providers.map(p => (
          <Provider key={p} provider={p} onLogin={onLogin} />
        ))}
      </div>
    );
  }
}
