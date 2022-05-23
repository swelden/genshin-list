import { useState } from "react";

const useRange = (
  min: number,
  max: number,
  initialStart: number = min,
  initialEnd: number = max
) => {
  const [start, setStart] = useState(initialStart);
  const [end, setEnd] = useState(initialEnd);

  const decrementStart = () => {
    setStart(Math.max(start - 1, min));
  };

  const incrementStart = () => {
    setStart(Math.min(start + 1, end - 1));
  };

  const decrementEnd = () => {
    setEnd(Math.max(end - 1, start + 1));
  };

  const incrementEnd = () => {
    setEnd(Math.min(end + 1, max));
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
