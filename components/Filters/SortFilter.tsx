import { useRef, useState } from "react";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import { DropDownIcon } from "../icons";
import Button from "./Button";

interface Options {
  title: string;
  value: CharacterSortKeys;
}

// TODO: add sort function value to options
const options: Options[] = [
  { title: "Sort by Elemental Type", value: "vision" },
  { title: "Sort by Weapon Type", value: "weapon" },
  { title: "Sort by Nation", value: "nation" },
  { title: "Sort by Name", value: "name" },
];

type SortDropdownProps = React.FC<{
  setSortKey: React.Dispatch<React.SetStateAction<CharacterSortKeys>>;
}>;

const SortDropdown: SortDropdownProps = ({ setSortKey }) => {
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
      <Button
        onClick={handleClickInside}
        className="justify-between pl-4 pr-3"
        ariaHaspopup={true}
        ariaExpanded={isOpen}
      >
        <span className="truncate">{options[selectedOption].title}</span>
        <DropDownIcon />
      </Button>
      {isOpen && (
        <div
          role="listbox"
          className="absolute top-[2.15rem] z-10 w-full cursor-pointer overflow-hidden rounded-2xl bg-ui-contrast shadow-md"
        >
          {options.map(({ title, value }, index) => (
            <button
              className="group w-full p-0.5 py-[0.035rem] text-left outline-none first:pt-0.5 last:pb-0.5"
              key={title}
              role="option"
              aria-selected={selectedOption === index}
              onClick={() => {
                setIsOpen(false);
                setSelectedOption(index);
                setSortKey(value);
              }}
            >
              <div
                className={`rounded-full p-0.5 px-4 font-medium text-sort-text group-hover:bg-sort-hover-bg group-hover:text-sort-hover-text group-focus-visible:outline group-focus-visible:outline-1 ${
                  selectedOption === index ? "bg-sort-hover-bg" : ""
                }`}
              >
                {title}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SortDropdown;
