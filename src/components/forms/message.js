import { h, Component } from "preact";

const messages = {
  confirm: {
    type: "success",
    text:
      "Un message contenant un lien d'activation a été envoyé sur votre boite mail. Cliquez sur ce lien pour terminer l'inscription."
  },
  password_mail: {
    type: "success",
    text:
      "Nous avons envoyé un mail de récupération, suivez le lien pour réinitialiser votre mot de passe."
  },
  email_changed: {
    type: "sucess",
    text: "Votre adresse email a été mise à jour."
  },
  verfication_error: {
    type: "error",
    text:
      "Une erreur est survenue lors de la vérification de votre compte. Veuillez réessayer ou contacter un administrateur."
  },
  signup_disabled: {
    type: "error",
    text:
      "Les inscriptions publiques sont désactivées. Contactez un administrateur pour être inviteé."
  }
};

export default class Message extends Component {
  render() {
    const { type } = this.props;
    const msg = messages[type];

    return (
      <div className={`flashMessage ${msg.type}`}>
        <span>{msg.text}</span>
      </div>
    );
  }
}
