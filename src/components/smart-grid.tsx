/*****************************************************************************
 * Imports
 *****************************************************************************/
import { useRef } from "react";

import { useElementDomRect } from "hooks/elements";

/*****************************************************************************
 * Component
 *****************************************************************************/

export default function SmartGrid ({
  numColumns,
  children,
  gapSize,
  aspectRatio,
} : {
  numColumns: number,
  children: any,
  gapSize?: number,
  aspectRatio?: number,
}) {
  const target = useRef(null);
  const containerSize = useElementDomRect(target);

  const numGaps = numColumns - 1;
  gapSize = gapSize === undefined ? 8 : gapSize;
  const posterWidth = containerSize
    ? (containerSize.width - gapSize * numGaps) / numColumns
    : undefined;

  const posterHeight = aspectRatio && posterWidth ? aspectRatio * posterWidth : "auto";

  return (
    <div
      ref={target}
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "start",
        gap: `${gapSize}px`,
      }}
    >
      {children.map((item, idx) => (
        <div key={idx} style={{ width: posterWidth, height: posterHeight }}>
          {item}
        </div>
      ))}
    </div>
  );
};
