import { h } from "preact";

type MessageType =
  | "confirm"
  | "password_mail"
  | "email_changed"
  | "verfication_error"
  | "signup_disabled";

const messages: Record<MessageType, { type: string; text: string }> = {
  confirm: {
    type: "success",
    text: "message_confirm"
  },
  password_mail: {
    type: "success",
    text: "message_password_mail"
  },
  email_changed: {
    type: "sucess",
    text: "message_email_changed"
  },
  verfication_error: {
    type: "error",
    text: "message_verfication_error"
  },
  signup_disabled: {
    type: "error",
    text: "message_signup_disabled"
  }
};

interface MessageProps {
  type: MessageType;
  t: (key: string) => string;
}

export default function Message({ type, t }: MessageProps) {
  const msg = messages[type];

  return (
    <div className={`flashMessage ${msg.type}`}>
      <span>{t(msg.text)}</span>
    </div>
  );
}
