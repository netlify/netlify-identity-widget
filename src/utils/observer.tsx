import {
  FunctionalComponent,
  ComponentChildren,
  RenderableProps
} from "preact";
import { useRef, useReducer, useEffect } from "preact/hooks";
import { Reaction } from "mobx";

/**
 * Minimal observer HOC for Preact 10 + MobX 6.
 *
 * Calls the wrapped function component directly inside MobX's reaction.track()
 * so that all observable accesses are recorded. When any tracked observable
 * changes, the wrapper forces a re-render.
 *
 * Based on the same approach as mobx-react-lite's useObserver.
 */
export function observer<P extends object>(
  BaseComponent: FunctionalComponent<P>
): FunctionalComponent<P> {
  const name = BaseComponent.displayName || BaseComponent.name || "Component";

  function ObserverWrapper(props: RenderableProps<P>) {
    const [, forceUpdate] = useReducer((c: number) => c + 1, 0);

    const reactionRef = useRef<Reaction | null>(null);
    if (!reactionRef.current) {
      reactionRef.current = new Reaction(`observer(${name})`, () => {
        forceUpdate(0);
      });
    }

    useEffect(() => {
      return () => {
        reactionRef.current?.dispose();
        reactionRef.current = null;
      };
    }, []);

    let result: ComponentChildren;
    reactionRef.current.track(() => {
      result = BaseComponent(props);
    });
    return result!;
  }

  ObserverWrapper.displayName = `observer(${name})`;
  return ObserverWrapper;
}
