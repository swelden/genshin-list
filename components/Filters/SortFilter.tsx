import { useRef, useState } from "react";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import { DropDownIcon } from "../icons";
import Button from "./Button";

// TODO: add sort function value to options
const options = ["Sort by Elemental Type", "Sort by Weapon Type", "Default"];

const SortDropdown = () => {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options.length - 1);

  const handleClickOutside = () => {
    // Your custom logic here
    // console.log("clicked outside");
    setIsOpen(false);
  };

  const handleClickInside = () => {
    // Your custom logic here
    // console.log("clicked inside");
    setIsOpen(!isOpen);
  };

  useOnClickOutside(ref, handleClickOutside);

  return (
    <div ref={ref} className="relative col-span-2">
      <Button onClick={handleClickInside} className="justify-between pl-4 pr-3">
        <span className="truncate">{options[selectedOption]}</span>
        <DropDownIcon />
      </Button>
      {isOpen && (
        <ul className="absolute top-[2.15rem] z-10 w-full cursor-pointer overflow-hidden rounded-2xl bg-ui-contrast">
          {options.map((option, index) => (
            <li
              className="group p-0.5 py-[0.035rem] first:pt-0.5 last:pb-0.5"
              key={option}
              role="option"
              aria-selected={selectedOption === index}
              tabIndex={0}
              onClick={() => {
                setIsOpen(false);
                setSelectedOption(index);
              }}
            >
              <div
                className={`rounded-full p-0.5 pl-4 font-medium text-sort-text group-hover:bg-sort-hover-bg group-hover:text-sort-hover-text ${
                  selectedOption === index ? "bg-sort-hover-bg" : ""
                }`}
              >
                {option}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SortDropdown;
