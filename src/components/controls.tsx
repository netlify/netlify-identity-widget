import { h } from "preact";
import { useContext } from "preact/hooks";
import { observer } from "../utils/observer";
import { StoreContext } from "../state/context";

interface ControlsProps {
  mode?: "button" | "menu";
  text?: string;
}

function Controls({ mode, text }: ControlsProps) {
  const store = useContext(StoreContext);

  if (!store) {
    return null;
  }

  const { user, translate: t } = store;

  const handleSignup = () => {
    store.openModal("signup");
  };

  const handleLogin = () => {
    store.openModal("login");
  };

  const handleLogout = () => {
    store.openModal("user");
  };

  const handleButton = () => {
    store.openModal(user ? "user" : "login");
  };

  if (mode === "button") {
    return (
      <button
        type="button"
        className="netlify-identity-button"
        onClick={handleButton}
      >
        {text || (user ? t("log_out") : t("log_in"))}
      </button>
    );
  }

  if (user) {
    return (
      <ul className="netlify-identity-menu">
        <li className="netlify-identity-item netlify-identity-user-details">
          {t("logged_in_as")}{" "}
          <span className="netlify-identity-user">
            {user.user_metadata?.name || user.email}
          </span>
        </li>
        <li className="netlify-identity-item">
          <button
            type="button"
            className="netlify-identity-logout"
            onClick={handleLogout}
          >
            {t("log_out")}
          </button>
        </li>
      </ul>
    );
  }

  return (
    <ul className="netlify-identity-menu">
      <li className="netlify-identity-item">
        <button
          type="button"
          className="netlify-identity-signup"
          onClick={handleSignup}
        >
          {t("sign_up")}
        </button>
      </li>
      <li className="netlify-identity-item">
        <button
          type="button"
          className="netlify-identity-login"
          onClick={handleLogin}
        >
          {t("log_in")}
        </button>
      </li>
    </ul>
  );
}

export default observer(Controls);
