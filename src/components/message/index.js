import {h, Component} from "preact";

const messages = {
  confirm: {
    type: "success",
    text: "We've sent a confirmation message to your email. Follow the link there to activate your account."
  },
  email_changed: {
    type: "sucess",
    text: "Your mail has been updated!"
  }
}

export default class Message extends Component {
  render() {
    const {type} = this.props;
    const msg = messages[type];

    return <div className={`flashMessage ${msg.type}`}><span>{msg.text}</span></div>;
  }
}
