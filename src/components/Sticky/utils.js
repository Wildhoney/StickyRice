import { useState, useCallback } from "react";

export function getInlineStyles({
  scroll,
  wrapperWidth,
  containerWidth,
  scrollbarWidth,
}) {
  const wrapper = {
    display: "grid",
    gridTemplateAreas: "default-area",
    contain: "content",
    width: "100%",
    border: "1px solid lightgray",
  };

  const container = {
    gridArea: "default-area",
  };

  const invisible = {
    opacity: 0,
  };

  const scroller = {
    width: `${wrapperWidth}px`,
    gridArea: "default-area",
    overflow: "auto",
    position: "relative",
    zIndex: 0,
  };

  const placeholder = {
    width: containerWidth ? `${containerWidth}px` : null,
    pointerEvents: "none",
  };

  return {
    wrapper,
    container,
    invisible,
    scroller,
    placeholder,
    transform: {
      ...container,
      overflow: wrapperWidth ? null : "auto",
      paddingBottom: scrollbarWidth ? `${scrollbarWidth}px` : null,
      transform: scroll
        ? `translate(-${scroll.left}px, -${scroll.top}px)`
        : null,
    },
  };
}

export function useScroll() {
  const [scroll, setScroll] = useState(null);

  const handleScroll = useCallback(
    ({ target }) =>
      setScroll({ left: target.scrollLeft, top: target.scrollTop }),
    []
  );

  return [scroll, handleScroll];
}
