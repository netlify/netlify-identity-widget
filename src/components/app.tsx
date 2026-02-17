import { h } from "preact";
import { useContext } from "preact/hooks";
import { observer } from "../utils/observer";
import { StoreContext } from "../state/context";
import Modal from "./modal";
import SiteURLForm from "./forms/siteurl";
import LogoutForm from "./forms/logout";
import UserForm from "./forms/user";
import Providers from "./forms/providers";
import Message from "./forms/message";
import type { ModalPage } from "../state/types";

interface PageConfig {
  login?: boolean;
  signup?: boolean;
  title?: string;
  button?: string;
  button_saving?: string;
  name?: boolean;
  email?: boolean;
  password?: string;
  link?: string;
  link_text?: string;
  providers?: boolean;
}

const pagesWithHeader: Record<string, boolean> = { login: true, signup: true };

const pages: Record<string, PageConfig> = {
  login: {
    login: true,
    button: "log_in",
    button_saving: "logging_in",
    email: true,
    password: "current-password",
    link: "amnesia",
    link_text: "forgot_password",
    providers: true
  },
  signup: {
    signup: true,
    button: "sign_up",
    button_saving: "signing_up",
    name: true,
    email: true,
    password: "new-password",
    providers: true
  },
  amnesia: {
    title: "recover_password",
    button: "send_recovery_email",
    button_saving: "sending_recovery_email",
    email: true,
    link: "login",
    link_text: "never_mind"
  },
  recovery: {
    title: "recover_password",
    button: "update_password",
    button_saving: "updating_password",
    password: "new-password",
    link: "login",
    link_text: "never_mind"
  },
  invite: {
    title: "complete_your_signup",
    button: "sign_up",
    button_saving: "signing_up",
    password: "new-password",
    providers: true
  },
  user: {
    title: "logged_in"
  }
};

interface FormData {
  name: string;
  email: string;
  password: string;
}

function App() {
  const store = useContext(StoreContext);

  if (!store) {
    return null;
  }

  const handleClose = () => store.closeModal();
  const handlePage = (page: string) => store.openModal(page as ModalPage);
  const handleLogout = () => store.logout();
  const handleSiteURL = (url?: string) => {
    if (url) store.setSiteURL(url);
  };
  const clearSiteURL = () => store.clearSiteURL();
  const clearStoreError = () => store.setError();
  const handleExternalLogin = (provider: string) =>
    store.externalLogin(provider);

  const handleUser = ({ name, email, password }: FormData) => {
    switch (store.modal.page) {
      case "login":
        store.login(email, password);
        break;
      case "signup":
        store.signup(name, email, password);
        break;
      case "amnesia":
        store.requestPasswordRecovery(email);
        break;
      case "invite":
        store.acceptInvite(password);
        break;
      case "recovery":
        store.updatePassword(password);
        break;
    }
  };

  const renderBody = () => {
    const page = pages[store.modal.page] || {};
    const pageLinkHandler = () => handlePage(page.link!);

    if (store.isLocal && store.siteURL === null) {
      return (
        <SiteURLForm
          devMode={store.siteURL != null}
          onSiteURL={store.siteURL ? clearSiteURL : handleSiteURL}
          t={store.translate}
        />
      );
    }
    if (!store.settings) {
      return null;
    }
    if (store.user) {
      return (
        <LogoutForm
          user={store.user}
          saving={store.saving}
          onLogout={handleLogout}
          t={store.translate}
        />
      );
    }
    if (store.modal.page === "signup" && store.settings.disable_signup) {
      return <Message type="signup_disabled" t={store.translate} />;
    }

    return (
      <div>
        <UserForm
          key={store.modal.page}
          page={{
            name: page.name,
            email: page.email,
            password: page.password,
            button: page.button || "",
            button_saving: page.button_saving || ""
          }}
          message={store.message}
          saving={store.saving}
          onSubmit={handleUser}
          namePlaceholder={store.namePlaceholder}
          t={store.translate}
        />
        {!store.user && page.link && store.gotrue && (
          <button
            onClick={pageLinkHandler}
            className="btnLink forgotPasswordLink"
          >
            {store.translate(page.link_text!)}
          </button>
        )}
        {store.isLocal ? (
          <SiteURLForm
            devMode={store.siteURL != null}
            onSiteURL={store.siteURL ? clearSiteURL : handleSiteURL}
            t={store.translate}
          />
        ) : (
          <div />
        )}
      </div>
    );
  };

  const renderProviders = () => {
    if (!(store.gotrue && store.settings)) {
      return null;
    }
    if (store.modal.page === "signup" && store.settings.disable_signup) {
      return null;
    }
    const page = pages[store.modal.page] || {};

    if (!page.providers) {
      return null;
    }

    const providers = [
      "Google",
      "GitHub",
      "GitLab",
      "BitBucket",
      "Facebook",
      "SAML"
    ].filter((p) => store.settings!.external[p.toLowerCase()]);

    return providers.length ? (
      <Providers
        providers={providers}
        labels={store.settings.external_labels || {}}
        onLogin={handleExternalLogin}
        t={store.translate}
      />
    ) : null;
  };

  const showHeader = pagesWithHeader[store.modal.page] || false;
  const showSignup = store.settings && !store.settings.disable_signup;
  const page = pages[store.modal.page] || {};

  return (
    <div>
      <Modal
        page={page}
        error={store.error}
        showHeader={showHeader}
        showSignup={!!showSignup}
        devSettings={!store.gotrue}
        loading={!store.error && !!store.gotrue && !store.settings}
        isOpen={store.modal.isOpen}
        onPage={handlePage}
        onClose={handleClose}
        logo={store.modal.logo}
        t={store.translate}
        isLocal={store.isLocal || false}
        clearSiteURL={clearSiteURL}
        clearStoreError={clearStoreError}
      >
        {renderBody()}
        {renderProviders()}
      </Modal>
    </div>
  );
}

export default observer(App);
