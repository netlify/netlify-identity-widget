import { h } from "preact";
import { useState } from "preact/hooks";

function removeFrom(string: string, mark: string): string {
  const index = string.indexOf(mark);
  if (index === -1) {
    return string;
  }

  return string.substring(0, string.length - mark.length);
}

interface SiteURLFormProps {
  devMode?: boolean;
  onSiteURL: (url?: string) => void;
  t: (key: string) => string;
}

export default function SiteURLForm({
  devMode,
  onSiteURL,
  t
}: SiteURLFormProps) {
  const [url, setUrl] = useState("");
  const [development] = useState(devMode || false);

  const handleInput = (e: Event) => {
    const target = e.target as HTMLInputElement;
    setUrl(target.value);
  };

  const addSiteURL = (e: Event) => {
    e.preventDefault();
    const cleanUrl = removeFrom(url, "/.netlify/identity");
    onSiteURL(cleanUrl);
  };

  const clearSiteURL = (e: Event) => {
    e.preventDefault();
    onSiteURL();
  };

  return (
    <div>
      {development ? (
        <div class="subheader">
          <h3>{t("site_url_title")}</h3>
          <button onClick={clearSiteURL} className="btnLink forgotPasswordLink">
            {t("site_url_link_text")}
          </button>
        </div>
      ) : (
        <form onSubmit={addSiteURL} className="form">
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
                onInput={handleInput}
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
