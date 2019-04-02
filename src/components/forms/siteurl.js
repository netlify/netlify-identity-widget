import { h, Component } from "preact";

export default class SiteURLForm extends Component {
  constructor(props) {
    super(props);
    this.state = { url: "", development: props.devMode || false };
  }

  handleInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  addSiteURL = e => {
    e.preventDefault();
    this.props.onSiteURL(this.state.url);
  };

  clearSiteURL = e => {
    e.preventDefault;
    this.props.onSiteURL();
  };

  render() {
    const { url, development } = this.state;

    return (
      <div>
        {development ? (
          <div class="subheader">
            <h3>Options de développement</h3>
            <button
              onclick={e => this.clearSiteURL(e)}
              className="btnLink forgotPasswordLink"
            >
              effacer l'URL de l'hôte local
            </button>
          </div>
        ) : (
          <form onsubmit={this.addSiteURL} className="form">
            <div className="flashMessage">
              {
                // "Looks like you're running a local server. Please let us know the URL of your Netlify site."
                "Vous semblez utiliser un serveur local. Veuillez fournir l'URL de votre site Netlify"
              }
            </div>
            <div className="formGroup">
              <label>
                <span className="visuallyHidden">
                  Entrez l'URL de votre site Netlify
                </span>
                <input
                  className="formControl"
                  type="url"
                  name="url"
                  value={url}
                  placeholder="URL de votre site Netlify"
                  autocapitalize="off"
                  required
                  oninput={this.handleInput}
                />
                <div className="inputFieldIcon inputFieldUrl" />
              </label>
            </div>
            <button type="submit" className="btn">
              Définir l'URL du site
            </button>
          </form>
        )}
      </div>
    );
  }
}
