import React, { useCallback, useRef } from "react";
import PropTypes from "prop-types";
import { useGetSet, useMeasure, useScrollbarWidth } from "react-use";

export default function Sticky({ children, ...props }) {
  const scroller = useRef();
  const [get, set] = useGetSet(0);
  const scrollBarSize = 15 ?? useScrollbarWidth();
  const [outer, { width: outerWidth }] = useMeasure();
  const [inner, { width: innerWidth }] = useMeasure();

  const handleWheel = useCallback(
    ({ deltaX, deltaY }) => {
      document.body.style.overscrollBehavior = "none";

      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        const x = get() - deltaX;
        const d = innerWidth - outerWidth;
        const scrollPosition = x > 0 ? 0 : Math.abs(x) >= d ? -d : x;
        scroller.current.scrollLeft = Math.abs(scrollPosition);
        set(scrollPosition);
      }
    },
    [innerWidth, outerWidth]
  );

  const handleScroll = useCallback(() => set(-scroller.current.scrollLeft), []);

  const handleMouseEnter = useCallback(
    () => (document.body.style.overscrollBehavior = "none"),
    []
  );

  const handleMouseLeave = useCallback(
    () => (document.body.style.overscrollBehavior = "auto"),
    []
  );

  return (
    <div
      ref={outer}
      {...props}
      style={{ contain: "content" }}
      onWheel={handleWheel}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={inner}
        style={{
          transform: `translate(${get()}px, 0)`,
          width: "max-content",
        }}
      >
        {children}

        <div
          ref={scroller}
          style={{
            overflowX: "scroll",
            overflowY: "hidden",
            height: `${scrollBarSize}px`,
            width: `${outerWidth}px`,
            marginTop: `-${scrollBarSize}px`,
            transform: `translate(${Math.abs(get())}px, 0)`,
          }}
          onScroll={handleScroll}
        >
          <div
            style={{ width: `${innerWidth}px`, border: "1px solid white" }}
          />
        </div>
      </div>
    </div>
  );
}

Sticky.propTypes = {
  children: PropTypes.node,
};

Sticky.defaultProps = { children: null };
