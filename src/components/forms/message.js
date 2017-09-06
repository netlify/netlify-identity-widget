import {h, Component} from "preact";

const messages = {
  confirm: {
    type: "success",
    text: "We've sent a confirmation message to your email. Follow the link there to activate your account."
  },
  password_mail: {
    type: "success",
    text: "We've sent a recovery email to your account. Follw the link there to reset your password."
  },
  email_changed: {
    type: "sucess",
    text: "Your mail has been updated!"
  },
  verfication_error: {
    type: "error",
    text: "There was an error verifying your account. Please try again or contact an administrator."
  },
  signup_disabled: {
    type: "error",
    text: "Public signups are disabled. Contact an administrator and ask for an invite."
  }
}

export default class Message extends Component {
  render() {
    const {type} = this.props;
    const msg = messages[type];

    return <div className={`flashMessage ${msg.type}`}><span>{msg.text}</span></div>;
  }
}
