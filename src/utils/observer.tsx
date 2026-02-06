import {
  h,
  Component,
  ComponentType,
  ComponentChildren,
  RenderableProps
} from "preact";
import { Reaction } from "mobx";

/**
 * Minimal observer HOC for Preact + MobX 6.
 * mobx-preact is unmaintained and mobx-react-lite requires preact/compat.
 */
export function observer<P extends object>(
  BaseComponent: ComponentType<P>
): ComponentType<P> {
  const name = BaseComponent.displayName || BaseComponent.name || "Component";

  class Observer extends Component<P> {
    private reaction: Reaction | null = null;

    componentWillMount() {
      this.reaction = new Reaction(`observer(${name})`, () => {
        this.forceUpdate();
      });
    }

    componentWillUnmount() {
      this.reaction?.dispose();
    }

    render(): ComponentChildren {
      let result: ComponentChildren;
      this.reaction!.track(() => {
        result = h(BaseComponent, this.props as RenderableProps<P>);
      });
      return result!;
    }
  }

  Observer.displayName = `observer(${name})`;
  return Observer;
}
