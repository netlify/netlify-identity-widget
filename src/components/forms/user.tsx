import { h } from "preact";
import { useState } from "preact/hooks";
import Message from "./message";
import Button from "./button";

interface PageConfig {
  name?: boolean;
  email?: boolean;
  password?: string;
  button: string;
  button_saving: string;
}

type MessageType =
  | "confirm"
  | "password_mail"
  | "email_changed"
  | "verfication_error"
  | "signup_disabled";

interface FormData {
  name: string;
  email: string;
  password: string;
}

interface UserFormProps {
  page: PageConfig;
  message?: MessageType | null;
  saving: boolean;
  namePlaceholder?: string | null;
  onSubmit: (data: FormData) => void;
  t: (key: string) => string;
}

export default function UserForm({
  page,
  message,
  saving,
  namePlaceholder,
  onSubmit,
  t
}: UserFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleInput = (e: Event) => {
    const target = e.target as HTMLInputElement;
    const { name: fieldName, value } = target;

    switch (fieldName) {
      case "name":
        setName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
    }
  };

  const handleLogin = (e: Event) => {
    e.preventDefault();
    onSubmit({ name, email, password });
  };

  return (
    <form onSubmit={handleLogin} className={`form ${saving ? "disabled" : ""}`}>
      {message && <Message type={message} t={t} />}
      {page.name && (
        <div className="formGroup">
          <label>
            <span className="visuallyHidden">{t("form_name_placeholder")}</span>
            <input
              className="formControl"
              type="text"
              name="name"
              value={name}
              placeholder={
                namePlaceholder ? namePlaceholder : t("form_name_label")
              }
              autocomplete="name"
              autocapitalize="off"
              required
              onInput={handleInput}
            />
            <div className="inputFieldIcon inputFieldName" />
          </label>
        </div>
      )}
      {page.email && (
        <div className="formGroup">
          <label>
            <span className="visuallyHidden">{t("form_name_label")}</span>
            <input
              className="formControl"
              type="email"
              name="email"
              value={email}
              placeholder={t("form_email_placeholder")}
              autocomplete="email"
              autocapitalize="off"
              required
              onInput={handleInput}
            />
            <div className="inputFieldIcon inputFieldEmail" />
          </label>
        </div>
      )}
      {page.password && (
        <div className="formGroup">
          <label>
            <span className="visuallyHidden">{t("form_password_label")}</span>
            <input
              className="formControl"
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              placeholder={t("form_password_placeholder")}
              autocomplete={page.password}
              required
              onInput={handleInput}
            />
            <div className="inputFieldIcon inputFieldPassword" />
          </label>
          <button
            type="button"
            className={`btnPasswordToggle ${showPassword ? "passwordVisible" : ""}`}
            onClick={() => setShowPassword(!showPassword)}
          >
            <span className="visuallyHidden">
              {t(showPassword ? "hide_password" : "show_password")}
            </span>
          </button>
        </div>
      )}
      <Button
        saving={saving}
        text={t(page.button)}
        saving_text={t(page.button_saving)}
      />
    </form>
  );
}
