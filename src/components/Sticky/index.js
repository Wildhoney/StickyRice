import React, { useCallback, useRef, useState } from "react";
import PropTypes from "prop-types";
import { useMeasure, useScrollbarWidth } from "react-use";

export default function Sticky({ children, ...props }) {
  const scroller = useRef();
  const scrollBarSize = 15 ?? useScrollbarWidth();
  const [scrollPosition, setScrollPosition] = useState({ left: 0, top: 0 });
  const [outer, { width: outerWidth }] = useMeasure();
  const [inner, { width: innerWidth }] = useMeasure();
  const isClient = true;
  // const isClient = scrollBarSize > 0;

  const handleWheel = useCallback(
    ({ deltaX, deltaY }) => {
      document.body.style.overscrollBehavior = "none";

      if (scroller.current && Math.abs(deltaX) > Math.abs(deltaY))
        scroller.current.scrollLeft += deltaX;
    },
    [innerWidth, outerWidth]
  );

  const handleScroll = useCallback(
    () => setScrollPosition({ left: -scroller.current.scrollLeft, top: 0 }),
    []
  );

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
      style={
        isClient
          ? { contain: "content" }
          : { overflowX: "auto", overflowY: "hidden" }
      }
      onWheel={handleWheel}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={inner}
        style={
          isClient
            ? {
                transform: `translate(${scrollPosition.left}px, 0)`,
                width: "max-content",
              }
            : {}
        }
      >
        {children}

        {isClient && innerWidth > outerWidth && (
          <div
            ref={scroller}
            style={{
              overflowX: "scroll",
              overflowY: "hidden",
              // position: "sticky",
              // bottom: 0,
              height: `${scrollBarSize}px`,
              width: `${outerWidth}px`,
              transform: `translate(${Math.abs(scrollPosition.left)}px, 0)`,
            }}
            onScroll={handleScroll}
          >
            <div
              style={{ width: `${innerWidth}px`, border: "1px solid white" }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

Sticky.propTypes = {
  children: PropTypes.node,
};

Sticky.defaultProps = { children: null };
