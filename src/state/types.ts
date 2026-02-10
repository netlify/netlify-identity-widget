import type { User } from "gotrue-js";
import type GoTrue from "gotrue-js";
import type { Locale } from "../translations";

export type { Locale };

export type ModalPage =
  | "login"
  | "signup"
  | "amnesia"
  | "recovery"
  | "invite"
  | "user"
  | "message";

export type MessageType =
  | "confirm"
  | "password_mail"
  | "email_changed"
  | "verfication_error"
  | null;

export interface Settings {
  autoconfirm?: boolean;
  disable_signup?: boolean;
  external: Record<string, boolean>;
  external_labels?: Record<string, string>;
}

export interface Modal {
  page: ModalPage;
  isOpen: boolean;
  logo: boolean;
}

export interface Store {
  // State
  user: User | null;
  recovered_user: User | null;
  message: MessageType;
  settings: Settings | null;
  gotrue: GoTrue | null;
  error: Error | string | null;
  siteURL: string | null;
  remember: boolean;
  saving: boolean;
  invite_token: string | null;
  email_change_token: string | null;
  namePlaceholder: string | null;
  signupMetadata: Record<string, unknown> | null;
  modal: Modal;
  locale: Locale;
  isLocal?: boolean;

  // Actions
  setNamePlaceholder: (namePlaceholder: string | null) => void;
  startAction: () => void;
  setError: (err?: Error | string) => void;
  init: (gotrue: GoTrue | null, reloadSettings?: boolean) => void;
  loadSettings: () => void;
  setIsLocal: (isLocal: boolean) => void;
  setSiteURL: (url: string) => void;
  clearSiteURL: () => void;
  login: (email: string, password: string) => Promise<void>;
  externalLogin: (provider: string) => void;
  completeExternalLogin: (params: Record<string, string>) => void;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void> | void;
  updatePassword: (password: string) => void;
  acceptInvite: (password: string) => void;
  doEmailChange: () => Promise<void>;
  verifyToken: (type: string, token: string) => void;
  requestPasswordRecovery: (email: string) => void;
  openModal: (page: ModalPage) => void;
  closeModal: () => void;
  translate: (key: string) => string;
}
