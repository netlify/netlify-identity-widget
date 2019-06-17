import { h, Component } from "preact";
import { connect } from "mobx-preact";
import Modal from "./modal";
import SiteURLForm from "./forms/siteurl";
import LogoutForm from "./forms/logout";
import UserForm from "./forms/user";
import Providers from "./forms/providers";
import Message from "./forms/message";

const pagesWithHeader = { login: true, signup: true };
const pages = {
  login: {
    login: true,
    button: "Se connecter",
    button_saving: "Connexion",
    email: true,
    password: true,
    link: "amnesia",
    link_text: "Mot de passe oublié ?",
    providers: true
  },
  signup: {
    signup: true,
    button: "S'inscrire",
    button_saving: "Inscription",
    name: true,
    email: true,
    password: true,
    providers: true
  },
  amnesia: {
    title: "Récupérer mot de passe",
    button: "Envoyer un mail de récupération",
    button_saving: "Envoi d'un mail de récupération",
    email: true,
    link: "login",
    link_text: "Annuler"
  },
  recovery: {
    title: "Récupérer mot de passe",
    button: "Mise à jour du mot de passe",
    button_saving: "Updating password",
    password: true,
    link: "login",
    link_text: "Annuler"
  },
  invite: {
    title: "Complétez votre inscription",
    button: "S'inscrire",
    button_saving: "Inscription",
    password: true,
    providers: true
  },
  user: {
    title: "Connecté"
  }
};

@connect(["store"])
class App extends Component {
  handleClose = () => this.props.store.closeModal();
  handlePage = page => this.props.store.openModal(page);
  handleLogout = () => this.props.store.logout();
  handleSiteURL = url => this.props.store.setSiteURL(url);
  clearSiteURL = url => this.props.store.clearSiteURL();
  handleExternalLogin = provider => this.props.store.externalLogin(provider);
  handleUser = ({ name, email, password }) => {
    const { store } = this.props;

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

  renderBody() {
    const { store } = this.props;
    const page = pages[store.modal.page] || {};
    const pageLinkHandler = () => this.handlePage(page.link);

    if (!store.gotrue) {
      return <SiteURLForm onSiteURL={this.handleSiteURL} />;
    }
    if (!store.settings) {
      return;
    }
    if (store.user) {
      return (
        <LogoutForm
          user={store.user}
          saving={store.saving}
          onLogout={this.handleLogout}
        />
      );
    }
    if (store.modal.page === "signup" && store.settings.disable_signup) {
      return <Message type="signup_disabled" />;
    }

    return (
      <div>
        <UserForm
          page={pages[store.modal.page] || {}}
          message={store.message}
          saving={store.saving}
          onSubmit={this.handleUser}
          namePlaceholder={store.namePlaceholder}
        />
        {!store.user && page.link && store.gotrue && (
          <button
            onclick={pageLinkHandler}
            className="btnLink forgotPasswordLink"
          >
            {page.link_text}
          </button>
        )}
        {/* <SiteURLForm devMode={true} onSiteURL={this.clearSiteURL} /> */}
      </div>
    );
  }

  renderProviders() {
    const { store } = this.props;

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
      "SAML"
    ].filter(p => store.settings.external[p.toLowerCase()]);

    return providers.length ? (
      <Providers
        providers={providers}
        labels={store.settings.external_labels || {}}
        onLogin={this.handleExternalLogin}
      />
    ) : null;
  }

  render() {
    const { store } = this.props;
    const showHeader = pagesWithHeader[store.modal.page];
    const showSignup = store.settings && !store.settings.disable_signup;
    const page = pages[store.modal.page] || {};

    return (
      <div>
        <Modal
          page={page}
          error={store.error}
          showHeader={showHeader}
          showSignup={showSignup}
          devSettings={!store.gotrue}
          loading={!store.error && store.gotrue && !store.settings}
          isOpen={store.modal.isOpen}
          onPage={this.handlePage}
          onClose={this.handleClose}
          logo={store.modal.logo}
        >
          {this.renderBody()}
          {this.renderProviders()}
        </Modal>
      </div>
    );
  }
}

export default App;
