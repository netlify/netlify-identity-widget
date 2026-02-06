import { h } from "preact";
import { useContext } from "preact/hooks";
import { observer } from "../utils/observer";
import { StoreContext } from "../state/context";
import type { ModalPage } from "../state/types";

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

  const handleSignup = (e: Event) => {
    e.preventDefault();
    store.openModal("signup");
  };

  const handleLogin = (e: Event) => {
    e.preventDefault();
    store.openModal("login");
  };

  const handleLogout = (e: Event) => {
    e.preventDefault();
    store.openModal("user");
  };

  const handleButton = (e: Event) => {
    e.preventDefault();
    store.openModal(user ? "user" : ("login" as ModalPage));
  };

  if (mode === "button") {
    return (
      <a className="netlify-identity-button" href="#" onClick={handleButton}>
        {text || (user ? t("log_out") : t("log_in"))}
      </a>
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
          <a
            className="netlify-identity-logout"
            href="#"
            onClick={handleLogout}
          >
            {t("log_out")}
          </a>
        </li>
      </ul>
    );
  }

  return (
    <ul className="netlify-identity-menu">
      <li className="netlify-identity-item">
        <a className="netlify-identity-signup" href="#" onClick={handleSignup}>
          {t("sign_up")}
        </a>
      </li>
      <li className="netlify-identity-item">
        <a className="netlify-identity-login" href="#" onClick={handleLogin}>
          {t("log_in")}
        </a>
      </li>
    </ul>
  );
}

export default observer(Controls);
