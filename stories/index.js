import { h } from "preact";
import { storiesOf } from "@storybook/react";
import Modal from "../src/components/modal";
import UserForm from "../src/components/forms/user";
import "../src/components/modal.css";

const page = {
  signup: true,
  button: "Sign up",
  button_saving: "Signing Up",
  name: true,
  email: true,
  password: true,
  providers: true
};

storiesOf("modal", module).add("signup", () => (
  <Modal page={{ signup: true }} isOpen showHeader showSignup>
    <UserForm page={page} />
  </Modal>
));
