import { h } from "preact";

interface ProviderProps {
  provider: string;
  label: string;
  onLogin: (provider: string) => void;
  t: (key: string) => string;
}

function Provider({ provider, label, onLogin, t }: ProviderProps) {
  const handleLogin = (e: Event) => {
    e.preventDefault();
    onLogin(provider.toLowerCase());
  };

  return (
    <button
      onClick={handleLogin}
      className={`provider${provider} btn btnProvider`}
    >
      {`${t("continue_with")} ${label}`}
    </button>
  );
}

interface ProvidersProps {
  providers: string[];
  labels: Record<string, string>;
  onLogin: (provider: string) => void;
  t: (key: string) => string;
}

export default function Providers({
  providers,
  labels,
  onLogin,
  t
}: ProvidersProps) {
  const getLabel = (p: string): string => {
    const pId = p.toLowerCase();
    if (pId in labels) {
      return labels[pId];
    }
    return p;
  };

  return (
    <div className="providersGroup">
      <hr className="hr" data-text={t("or")} />
      {providers.map((p) => (
        <Provider
          key={p}
          provider={p}
          label={getLabel(p)}
          onLogin={onLogin}
          t={t}
        />
      ))}
    </div>
  );
}
