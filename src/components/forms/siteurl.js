import { h, Component } from "preact";

export default class SiteURLForm extends Component {
  constructor(props) {
    super(props);
    this.state = { url: "" };
  }

  handleInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSiteURL = e => {
    e.preventDefault();
    this.props.onSiteURL(this.state.url);
  };

  render() {
    const { url } = this.state;

    return (
      <form onsubmit={this.handleSiteURL} className="form">
        <div className="flashMessage">
          {
            "Looks like you're running a local server. Please let us know the URL of your site."
          }
        </div>
        <div className="formGroup">
          <label>
            <span className="visuallyHidden">Enter your Netlify Site URL</span>
            <input
              className="formControl"
              type="url"
              name="url"
              value={url}
              placeholder="URL of your Netlify site"
              autocapitalize="off"
              required
              oninput={this.handleInput}
            />
            <div className="inputFieldIcon inputFieldUrl" />
          </label>
        </div>
        <button type="submit" className="btn">
          Set site's URL
        </button>
      </form>
    );
  }
}
