import { useState } from "react";
import Button from "../Button";
import { SelectOption } from "../SelectMenu";
import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, DropDownIcon } from "../icons";

const options: SelectOption<CharacterSortKeys>[] = [
  { label: "Sort by Element", value: "element" },
  { label: "Sort by Weapon", value: "weapontype" },
  { label: "Sort by Region", value: "region" },
  { label: "Sort by Rarity", value: "rarity" }, // NOTE: might call Quality
  { label: "Sort by Name", value: "name" },
  { label: "Default", value: "version" },
];

type SortDropdownProps = React.FC<{
  setSortKey: React.Dispatch<React.SetStateAction<CharacterSortKeys>>;
}>;

const SortDropdown: SortDropdownProps = ({ setSortKey }) => {
  return <SelectMenu handleChange={setSortKey} />;
};

interface SelectMenuProps {
  handleChange: (value: CharacterSortKeys) => void;
}

const SelectMenu = ({ handleChange }: SelectMenuProps) => {
  const [selectedOption, setSelectedOption] = useState(
    options[options.length - 1]
  );

  const myChange = (event: SelectOption<CharacterSortKeys>) => {
    console.log(event);
    setSelectedOption(event);
    handleChange(event.value);
  };

  return (
    <Listbox value={selectedOption} onChange={myChange}>
      <div className="relative col-span-2">
        <Listbox.Button as={Button} className="justify-between pl-4 pr-3">
          <span className="block truncate">{selectedOption.label}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <DropDownIcon />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          enter="transition duration-100 ease-out"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-75 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
        >
          <Listbox.Options className="absolute z-10 w-full rounded-2xl bg-ui-contrast py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            {options.map((option) => (
              <Listbox.Option
                key={option.label}
                className={({ active }) =>
                  `relative w-full cursor-default select-none px-1 py-[0.035rem] text-left`
                }
                value={option}
              >
                {({ active, selected }) => (
                  <div
                    className={`rounded-full p-0.5 px-3 font-medium text-sort-text ${
                      active
                        ? "bg-sort-hover-bg text-sort-hover-text active:bg-ui active:text-ui-contrast"
                        : ""
                    }`}
                  >
                    <span className="block">{option.label}</span>
                    {selected && (
                      <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-sort-hover-text">
                        <CheckIcon />
                      </span>
                    )}
                  </div>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};

export default SortDropdown;
