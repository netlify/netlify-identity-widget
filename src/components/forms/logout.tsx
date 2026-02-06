import { h } from "preact";
import type { User } from "gotrue-js";
import Button from "./button";

interface LogoutFormProps {
  user: User;
  saving: boolean;
  onLogout: () => void;
  t: (key: string) => string;
}

export default function LogoutForm({
  user,
  saving,
  onLogout,
  t
}: LogoutFormProps) {
  const handleLogout = (e: Event) => {
    e.preventDefault();
    onLogout();
  };

  return (
    <form
      onSubmit={handleLogout}
      className={`form ${saving ? "disabled" : ""}`}
    >
      <p className="infoText">
        {t("logged_in_as")} <br />
        <span className="infoTextEmail">
          {user.user_metadata?.full_name ||
            user.user_metadata?.name ||
            user.email}
        </span>
      </p>
      <Button
        saving={saving}
        text={t("log_out")}
        saving_text={t("logging_out")}
      />
    </form>
  );
}
