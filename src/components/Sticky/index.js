import { useCallback, useRef } from "react";
import { useMeasure, useScrollbarWidth } from "react-use";
import * as utils from "./utils";

export default function Sticky({ children }) {
  const scroller = useRef();
  const [scroll, action] = utils.useScroll({ scroller });
  const [wrapper, { width: wrapperWidth }] = useMeasure();
  const [container, { width: containerWidth }] = useMeasure();
  const scrollbarWidth = useScrollbarWidth();

  const inlineStyles = utils.getInlineStyles({
    scroll,
    wrapperWidth,
    containerWidth,
    scrollbarWidth,
  });

  return (
    <section
      ref={wrapper}
      style={inlineStyles.wrapper}
      onPointerEnter={action.disableScroll}
      onPointerLeave={action.enableScroll}
      onWheel={action.handleWheel}
      onTouchMove={action.handleTouchMove}
      onTouchEnd={action.clearTouchMove}
    >
      <div
        ref={container}
        style={{ ...inlineStyles.container, ...inlineStyles.transform }}
      >
        {children}
      </div>

      <div
        ref={scroller}
        style={inlineStyles.scroller}
        onScroll={action.handleScroll}
      >
        <div
          style={{
            ...inlineStyles.container,
            ...inlineStyles.invisible,
            ...inlineStyles.placeholder,
          }}
        >
          &hellip;
        </div>
      </div>
    </section>
  );
}
