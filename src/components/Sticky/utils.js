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
  };

  const placeholder = {
    width: containerWidth ? `${containerWidth}px` : null,
  };

  const transform = {
    ...container,
    overflow: wrapperWidth ? null : "auto",
    paddingBottom: scrollbarWidth ? `${scrollbarWidth}px` : null,
    transform: scroll
      ? `translate(-${scroll.left}px, -${scroll.top}px)`
      : "translate(0, 0)",
  };

  return { wrapper, container, invisible, scroller, placeholder, transform };
}

let lastMove = null;

export function useScroll({ scroller }) {
  const [scroll, setScroll] = useState(null);

  const disableScroll = useCallback(
    () => (document.body.style.overscrollBehaviorX = "none")
  );

  const enableScroll = useCallback(
    () => (document.body.style.overscrollBehaviorX = "initial")
  );

  const handleWheel = useCallback(
    (event) => {
      console.log(event.nativeEvent.wheelDeltaX, event.nativeEvent.wheelDeltaY);

      scroller.current.scrollLeft =
        scroller.current.scrollLeft + -event.nativeEvent.wheelDeltaX;
    },
    [scroller]
  );

  const handleTouchMove = useCallback(
    (event) => {
      const x = event.touches[0].clientX;

      if (lastMove)
        scroller.current.scrollLeft =
          scroller.current.scrollLeft + lastMove - x;

      lastMove = x;
    },
    [scroller]
  );

  const clearTouchMove = useCallback(() => {
    lastMove = null;
  }, []);

  const handleScroll = useCallback(
    () =>
      setScroll({
        left: scroller.current.scrollLeft,
        top: scroller.current.scrollTop,
      }),
    [scroller]
  );

  return [
    scroll,
    {
      disableScroll,
      enableScroll,
      handleWheel,
      handleTouchMove,
      clearTouchMove,
      handleScroll,
    },
  ];
}
