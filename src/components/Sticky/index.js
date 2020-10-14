import { useMeasure, useScrollbarWidth } from "react-use";
import * as utils from "./utils";

export default function Sticky({ children }) {
  const [scroll, handleScroll] = utils.useScroll();
  const [wrapper, { width: wrapperWidth }] = useMeasure();
  const [container, { width: containerWidth }] = useMeasure();
  const scrollbarWidth = useScrollbarWidth();

  
  const inlineStyles = utils.getInlineStyles({
    scroll,
    wrapperWidth,
    containerWidth,
    scrollbarWidth,
  });
  console.log(inlineStyles.transform)

  return (
    <section ref={wrapper} style={inlineStyles.wrapper}>
      <div
        ref={container}
        style={{ ...inlineStyles.container, ...inlineStyles.transform }}
      >
        {children}
      </div>

      <div style={inlineStyles.scroller} onScroll={handleScroll}>
        <div
          style={{
            ...inlineStyles.container,
            ...inlineStyles.invisible,
            ...inlineStyles.placeholder,
          }}
        >
          abc
        </div>
      </div>
    </section>
  );
}
