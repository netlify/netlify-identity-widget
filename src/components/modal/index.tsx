import { h, ComponentChildren } from "preact";

interface ErrorWithJson extends Error {
  json?: {
    error_description?: string;
  };
}

function formatError(error: ErrorWithJson | string): string {
  if (typeof error === "string") {
    return error;
  }
  return (
    (error.json && error.json.error_description) ||
    error.message ||
    error.toString()
  );
}

interface PageConfig {
  signup?: boolean;
  login?: boolean;
  title?: string;
}

interface ModalProps {
  page: PageConfig;
  error?: Error | string | null;
  loading: boolean;
  showHeader: boolean;
  showSignup: boolean;
  devSettings: boolean;
  isOpen: boolean;
  children: ComponentChildren;
  logo: boolean;
  isLocal: boolean;
  onClose: () => void;
  onPage: (page: string) => void;
  clearSiteURL: (e: Event) => void;
  clearStoreError: () => void;
  t: (key: string) => string;
}

export default function Modal({
  page,
  error,
  loading,
  showHeader,
  showSignup,
  devSettings,
  isOpen,
  children,
  logo,
  isLocal,
  onClose,
  onPage,
  clearSiteURL,
  clearStoreError,
  t
}: ModalProps) {
  const handleClose = (e: Event) => {
    e.preventDefault();
    onClose();
  };

  const blockEvent = (e: Event) => {
    e.stopPropagation();
  };

  const linkHandler = (targetPage: string) => (e: Event) => {
    e.preventDefault();
    onPage(targetPage);
  };

  const hidden = loading || !isOpen;
  const formattedError = error ? formatError(error) : null;

  return (
    <div
      className="modalContainer"
      role="dialog"
      aria-hidden={`${hidden}`}
      onClick={handleClose}
    >
      <div
        className={`modalDialog${loading ? " visuallyHidden" : ""}`}
        onClick={blockEvent}
      >
        <div className="modalContent">
          <button onClick={handleClose} className="btn btnClose">
            <span className="visuallyHidden">Close</span>
          </button>
          {showHeader && (
            <div className="header">
              {showSignup && (
                <button
                  className={`btn btnHeader ${page.signup ? "active" : ""}`}
                  onClick={linkHandler("signup")}
                >
                  {t("sign_up")}
                </button>
              )}
              {!devSettings && (
                <button
                  className={`btn btnHeader ${page.login ? "active" : ""}`}
                  onClick={linkHandler("login")}
                >
                  {t("log_in")}
                </button>
              )}
            </div>
          )}
          {page.title && (
            <div className="header">
              <button className="btn btnHeader active">{t(page.title)}</button>
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
                  onClick={(e) => {
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
