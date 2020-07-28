import { h, Component } from "preact";

export default class SiteURLForm extends Component {
  constructor(props) {
    super(props);
    this.state = { url: "", development: props.devMode || false };
  }

  handleInput = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  addSiteURL = (e) => {
    e.preventDefault();
    this.props.onSiteURL(this.state.url);
  };

  clearSiteURL = (e) => {
    e.preventDefault;
    this.props.onSiteURL();
  };

  render() {
    const { url, development } = this.state;
    const { t } = this.props;

    return (
      <div>
        {development ? (
          <div class="subheader">
            <h3>{t("site_url_title")}</h3>
            <button
              onclick={(e) => this.clearSiteURL(e)}
              className="btnLink forgotPasswordLink"
            >
              {t("site_url_link_text")}
            </button>
          </div>
        ) : (
          <form onsubmit={this.addSiteURL} className="form">
            <div className="flashMessage">{t("site_url_message")}</div>
            <div className="formGroup">
              <label>
                <span className="visuallyHidden">{t("site_url_label")}</span>
                <input
                  className="formControl"
                  type="url"
                  name="url"
                  value={url}
                  placeholder={t("site_url_placeholder")}
                  autocapitalize="off"
                  required
                  oninput={this.handleInput}
                />
                <div className="inputFieldIcon inputFieldUrl" />
              </label>
            </div>
            <button type="submit" className="btn">
              {t("site_url_submit")}
            </button>
          </form>
        )}
      </div>
    );
  }
}
