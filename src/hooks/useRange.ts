import { useState } from "react";

const useRange = (
  min: number,
  max: number,
  step: number = 1,
  gap: number = 1,
  initialStart: number = min,
  initialEnd: number = max
) => {
  const [start, setStart] = useState(initialStart);
  const [end, setEnd] = useState(initialEnd);

  const decrementStart = () => {
    setStart(Math.max(start - step, min));
  };

  const incrementStart = () => {
    setStart(Math.min(start + step, end - gap));
  };

  const decrementEnd = () => {
    setEnd(Math.max(end - step, start + gap));
  };

  const incrementEnd = () => {
    setEnd(Math.min(end + step, max));
  };

  const reset = () => {
    setStart(initialStart);
    setEnd(initialEnd);
  };

  return {
    start,
    decrementStart,
    incrementStart,
    end,
    decrementEnd,
    incrementEnd,
    reset,
  };
};

export default useRange;
