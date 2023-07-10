import React, { useLayoutEffect, useState } from "react";
import useResizeObserver from "@react-hook/resize-observer";

export const useElementDomRect = (target) => {
  const [size, setSize] = useState<DOMRectReadOnly | null>(null);

  useLayoutEffect(() => {
    setSize(target.current?.getBoundingClientRect());
  }, [target]);

  React.useEffect(() => {
    if (size) {
      //console.log(size.bottom)
    }
  }, [size])

  useResizeObserver(target, (entry) => setSize(entry.contentRect));
  return size;
};

export const useElementDomRectNoRef = (element: HTMLElement) => {
  const [size, setSize] = useState<DOMRectReadOnly | null>(null);

  useLayoutEffect(() => {
    setSize(element?.getBoundingClientRect());
  }, [element]);

  useResizeObserver(element, (entry) => setSize(entry.contentRect));
  return size;
}
