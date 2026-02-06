import { h, Component } from "preact";
import { Reaction } from "mobx";

/**
 * Minimal observer HOC for Preact + MobX 6.
 * mobx-preact is unmaintained and mobx-react-lite requires preact/compat.
 */
export function observer(BaseComponent) {
  const name = BaseComponent.displayName || BaseComponent.name || "Component";

  return class Observer extends Component {
    static displayName = `observer(${name})`;

    componentWillMount() {
      this.reaction = new Reaction(`observer(${name})`, () => {
        this.forceUpdate();
      });
    }

    componentWillUnmount() {
      this.reaction?.dispose();
    }

    render() {
      let result;
      this.reaction.track(() => {
        result = <BaseComponent {...this.props} />;
      });
      return result;
    }
  };
}
