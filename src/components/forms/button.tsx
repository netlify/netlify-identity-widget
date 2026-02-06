import { h } from "preact";

interface ButtonProps {
  saving?: boolean;
  text?: string;
  saving_text?: string;
}

export default function Button({ saving, text, saving_text }: ButtonProps) {
  return (
    <button type="submit" className={`btn${saving ? " saving" : ""}`}>
      {saving ? saving_text || "Saving" : text || "Save"}
    </button>
  );
}
