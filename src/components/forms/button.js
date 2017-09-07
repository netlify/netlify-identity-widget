import { h, Component } from "preact";

export default class Button extends Component {
  render() {
    const { saving, text, saving_text } = this.props;

    return (
      <button type="submit" className={`btn${saving ? " saving" : ""}`}>
        {saving ? saving_text || "Saving" : text || "Save"}
      </button>
    );
  }
}
