import { h, Component } from "preact";

function formatError(error) {
  return (
    (error.json && error.json.error_description) ||
    error.message ||
    error.toString()
  );
}

export default class Modal extends Component {
  handleClose = (e) => {
    e.preventDefault();
    this.props.onClose();
  };

  blockEvent = (e) => {
    e.stopPropagation();
  };

  linkHandler = (page) => (e) => {
    e.preventDefault();
    this.props.onPage(page);
  };

  render() {
    const {
      page,
      error,
      loading,
      showHeader,
      showSignup,
      devSettings,
      isOpen,
      children,
      logo,
      t,
      isLocal,
      clearSiteURL,
      clearStoreError
    } = this.props;
    const hidden = loading || !isOpen;
    const formattedError = error ? formatError(error) : null;
    return (
      <div
        className="modalContainer"
        role="dialog"
        aria-hidden={`${hidden}`}
        onClick={this.handleClose}
      >
        <div
          className={`modalDialog${loading ? " visuallyHidden" : ""}`}
          onClick={this.blockEvent}
        >
          <div className="modalContent">
            <button onclick={this.handleClose} className="btn btnClose">
              <span className="visuallyHidden">Close</span>
            </button>
            {showHeader && (
              <div className="header">
                {showSignup && (
                  <button
                    className={`btn btnHeader ${page.signup ? "active" : ""}`}
                    onclick={this.linkHandler("signup")}
                  >
                    {t("sign_up")}
                  </button>
                )}
                {!devSettings && (
                  <button
                    className={`btn btnHeader ${page.login ? "active" : ""}`}
                    onclick={this.linkHandler("login")}
                  >
                    {t("log_in")}
                  </button>
                )}
              </div>
            )}
            {page.title && (
              <div className="header">
                <button className="btn btnHeader active">
                  {t(page.title)}
                </button>
              </div>
            )}
            {devSettings && (
              <div className="header">
                <button className="btn btnHeader active">
                  {t("site_url_title")}
                </button>
              </div>
            )}
            {formattedError && (
              <div className="flashMessage error">
                <span>{t(formattedError)}</span>
              </div>
            )}
            {isLocal &&
              formattedError &&
              formattedError.includes("Failed to load settings from") && (
                <div>
                  <button
                    onclick={(e) => {
                      clearSiteURL(e);
                      clearStoreError();
                    }}
                    className="btnLink forgotPasswordLink"
                  >
                    {t("site_url_link_text")}
                  </button>
                </div>
              )}
            {children}
          </div>
        </div>
        {logo && (
          <a
            href="https://www.netlify.com"
            className={`callOut${loading ? " visuallyHidden" : ""}`}
          >
            <span className="netlifyLogo" />
            {t("coded_by")}
          </a>
        )}
      </div>
    );
  }
}
