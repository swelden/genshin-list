import { useEffect, useRef } from "react";
import useRange from "../../hooks/useRange";
import styles from "./DoubleRangeSlider.module.css";

const DoubleRangeSlider: React.FC<{
  initialMin: number;
  initialMax: number;
  min: number;
  max: number;
  step: number;
  gap: number;
  onChange: (min: number, max: number) => void;
}> = ({ initialMin, initialMax, min, max, step, gap, onChange }) => {
  const progressRef = useRef<HTMLDivElement>(null);
  const {
    start,
    decrementStart,
    incrementStart,
    end,
    decrementEnd,
    incrementEnd,
    // reset,
  } = useRange(0, 6, step, gap, initialMin, initialMax);

  const handleMin = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = parseInt(e.target.value);
    newVal < start ? decrementStart() : incrementStart();
  };

  const handleMax = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = parseInt(e.target.value);
    newVal < end ? decrementEnd() : incrementEnd();
  };

  // Get min and max values when their state changes
  useEffect(() => {
    if (progressRef.current !== null) {
      progressRef.current.style.left = (start / max) * step * 100 + "%";
      progressRef.current.style.right = (step - (end / max) * step) * 100 + "%";
    }
    onChange(start, end); // NOTE: make sure onChange is a memoized function
  }, [start, end, max, step, onChange]);

  // NOTE: maybe I can change it so the numbers on the side show the min and max (so 0 and 6) and I can add a label above saying Ascension 1 to 4
  return (
    <div className="flex items-center gap-2">
      <span className="w-4 text-center">{start}</span>
      <div className="block w-[20rem] max-w-[20rem]">
        <div
          // slider
          className="relative mx-auto h-1 w-[96%] rounded-md bg-gray-300"
        >
          <div
            // progress
            className="absolute h-1 rounded bg-gold "
            ref={progressRef}
          ></div>
        </div>

        <div className="relative">
          <input
            onChange={handleMin}
            type="range"
            min={min}
            step={step}
            max={max}
            value={start}
            className={`${styles.thumb} pointer-events-none absolute -top-1 h-1 w-full appearance-none bg-transparent`}
          />

          <input
            onChange={handleMax}
            type="range"
            min={min}
            step={step}
            max={max}
            value={end}
            className={`${styles.thumb} pointer-events-none absolute -top-1 h-1 w-full appearance-none bg-transparent`}
          />
        </div>
      </div>
      <span className="w-4 text-center">{end}</span>
    </div>
  );
};

export default DoubleRangeSlider;
