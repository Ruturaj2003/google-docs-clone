"use client";

import { ChevronDown } from "lucide-react";
import { useRef, useState } from "react";

const markers = Array.from({ length: 83 }, (_, i) => i);

export const Ruler = () => {
  const [leftMargin, setLeftMargin] = useState(56);
  const [rightMargin, setRightMargin] = useState(56);

  const [isDraggingLeft, setIsDragingLeft] = useState(false);
  const [isDraggingRight, setIsDragingRight] = useState(false);

  const rulerRef = useRef<HTMLDivElement>(null);

  const handleLeftMouseDown = () => {
    setIsDragingLeft(true);
  };

  const handleRightMouseDown = () => {
    setIsDragingRight(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    // Only proceed if dragging from either side and rulerRef is available
    if ((isDraggingLeft || isDraggingRight) && rulerRef.current) {
      // Get the ruler container element inside the rulerRef
      const container = rulerRef.current.querySelector("#ruler-container");

      // Get container's position and dimensions relative to viewport
      const containerRect = container?.getBoundingClientRect();

      // Calculate mouse X position relative to the left edge of the container
      const relativeX = e.clientX - containerRect!.left;

      // Clamp position between 0 and 816 (ruler width or fixed boundary)
      const rawPosition = Math.max(0, Math.min(816, relativeX));

      // If dragging the left handle
      if (isDraggingLeft) {
        // Prevent left margin from overlapping right margin or exceeding limits
        const maxLeftPosition = 816 - rightMargin - 100;
        const newLeftMargin = Math.min(rawPosition, maxLeftPosition);

        // Update left margin state
        setLeftMargin(newLeftMargin); // TODO: Make Collaborative
      }

      // If dragging the right handle
      else if (isDraggingRight) {
        // Prevent right margin from overlapping left margin or exceeding limits
        const maxRightPosition = 816 - (leftMargin + 100);

        // Calculate how far from the right edge the drag is
        const newRightPosition = Math.max(816 - rawPosition, 0);

        // Constrain the right margin within allowed limits
        const constrainedRightPosition = Math.min(
          newRightPosition,
          maxRightPosition,
        );

        // Update right margin state
        setRightMargin(constrainedRightPosition);
      }
    }
  };

  const handleMouseUp = () => {
    setIsDragingLeft(false);
    setIsDragingRight(false);
  };

  const handleRightDoubleClick = () => {
    setRightMargin(56);
  };

  const handleLeftDoubleClick = () => {
    setLeftMargin(56);
  };
  return (
    <>
      <div
        ref={rulerRef}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className="relative mx-auto flex h-6 w-[816px] select-none items-end border-b border-gray-300 print:hidden"
      >
        <div className="relative h-full w-full" id="ruler-container">
          <Marker
            position={leftMargin}
            isLeft={true}
            isDragging={isDraggingLeft}
            onMouseDown={handleLeftMouseDown}
            onDoubleClick={handleLeftDoubleClick}
          />
          <Marker
            position={rightMargin}
            isLeft={false}
            isDragging={isDraggingRight}
            onMouseDown={handleRightMouseDown}
            onDoubleClick={handleRightDoubleClick}
          />
          <div className="absolute inset-x-0 bottom-0 h-full">
            <div className="relative h-full w-[816px]">
              {markers.map((marker) => {
                const position = (marker * 816) / 82;

                return (
                  <div
                    className="absolute bottom-0"
                    key={marker}
                    style={{ left: `${position}px` }}
                  >
                    {marker % 10 === 0 && (
                      <>
                        <div className="absolute bottom-0 h-2 w-[1px] bg-neutral-500"></div>
                        <span className="absolute bottom-2 -translate-x-1/2 transform text-[10px] text-neutral-500">
                          {marker / 10 + 1}
                        </span>
                      </>
                    )}
                    {marker % 5 === 0 && marker % 10 !== 0 && (
                      <>
                        <div className="absolute bottom-0 h-1.5 w-[1px] bg-neutral-500"></div>
                      </>
                    )}

                    {marker % 5 !== 0 && (
                      <>
                        <div className="absolute bottom-0 h-1 w-[1px] bg-neutral-500"></div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

interface MarkerProps {
  position: number;
  isLeft: boolean;
  isDragging: boolean;
  onMouseDown: () => void;
  onDoubleClick: () => void;
}

const Marker = ({
  position,
  isLeft,
  isDragging,
  onMouseDown,
  onDoubleClick,
}: MarkerProps) => {
  return (
    <>
      <div
        className="group absolute top-0 z-[5] -ml-2 h-full w-4 cursor-ew-resize"
        style={{
          [isLeft ? "left" : "right"]: `${position}px`,
        }}
        onMouseDown={onMouseDown}
        onDoubleClick={onDoubleClick}
      >
        <ChevronDown className="absolute left-1/2 top-0 h-full -translate-x-1/2 transform fill-blue-500" />
        <div
          className="absolute left-1/2 top-4 -translate-x-1/2 transform transition-opacity duration-150"
          style={{
            height: "100vh",
            width: "1px",
            transform: "scaleX(0.5)",
            backgroundColor: "#3b72f6",
            display: isDragging ? "block" : "none",
          }}
        ></div>
      </div>
    </>
  );
};
