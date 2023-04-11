import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useInView } from "react-intersection-observer";

function ReactLazyShow({ children }) {
  const [loaded, setLoaded] = useState(false);
  const [ref, inView] = useInView();
  const elementRef = useRef(null);

  useEffect(() => {
    if (inView && !loaded) {
      setLoaded(true);
    }
  }, [inView, loaded]);

return (
  <>
    {loaded && createPortal(children, elementRef.current)}
    <span
      ref={(node) => {
        ref.current = node;
        elementRef.current = node;
      }}
    />
  </>
);
}

export default ReactLazyShow;
