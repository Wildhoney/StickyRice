import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { useGetSet, useMeasure } from "react-use";

export default function Sticky({ children, ...props }) {
  const inner = useRef();
  const [get, set] = useGetSet(0);
  const [outer, { width: outerWidth }] = useMeasure();
  const [innerWidth, setInnerWidth] = useState(0);

  useEffect(() => {
    const width = window
      .getComputedStyle(inner.current.firstChild)
      .getPropertyValue("width");

    setInnerWidth(parseInt(width));
  }, [outerWidth]);

  return (
    <div
      ref={outer}
      {...props}
      style={{ contain: "content", border: "2px solid red" }}
      onWheel={(e) => {
        document.body.style.overscrollBehavior = "none";
        if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
          const x = get() - e.deltaX;
          const d = innerWidth - outerWidth;
          console.log(Math.abs(x), d);
          set(x > 0 ? 0 : Math.abs(x) >= d ? -d : x);
        }
      }}
      onMouseEnter={() => (document.body.style.overscrollBehavior = "none")}
      onMouseLeave={() => (document.body.style.overscrollBehavior = "auto")}
    >
      <div
        ref={inner}
        style={{
          transform: `translate(${get()}px, 0)`,
        }}
      >
        {children}
      </div>
    </div>
  );
}

Sticky.propTypes = { children: PropTypes.node };

Sticky.defaultProps = { children: null };
