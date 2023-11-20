import Button from "@/components/button";
import { CheckIcon, DropDownIcon } from "@/components/icons";
import { SelectOption } from "@/components/select-menu";
import { Listbox, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

const options: SelectOption<CharacterSortKeys>[] = [
  { label: "Version", value: "version" },
  { label: "Element", value: "element" },
  { label: "Weapon", value: "weapontype" },
  { label: "Region", value: "region" },
  { label: "Rarity", value: "rarity" }, // NOTE: might label Quality
  { label: "Name", value: "name" },
];

type SortDropdownProps = React.FC<{
  setSortKey: React.Dispatch<React.SetStateAction<CharacterSortKeys>>;
  className?: string;
}>;

const SortDropdown: SortDropdownProps = ({ setSortKey, className = "" }) => {
  return <SelectMenu setState={setSortKey} className={className} />;
};

interface SelectMenuProps {
  setState: (value: CharacterSortKeys) => void;
  className?: string;
}

const SelectMenu: React.FC<SelectMenuProps> = ({
  setState,
  className = "",
}) => {
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const handleChange = (event: SelectOption<CharacterSortKeys>) => {
    setSelectedOption(event);
    setState(event.value);
  };

  return (
    <Listbox value={selectedOption} onChange={handleChange}>
      <div className={`relative ${className}`}>
        <Listbox.Button
          as={Button}
          className="pl-4 pr-3"
          justifyContent="justify-start"
        >
          <span className="block truncate pr-4">
            Sort by {selectedOption.label}
          </span>
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
          <Listbox.Options className="absolute z-10 w-full rounded-2xl bg-card-brown py-1 shadow-xl ring-1 ring-black/20 focus:outline-none dark:bg-card-navy">
            {options.map((option) => (
              <Listbox.Option
                key={option.label}
                className="relative w-full cursor-default select-none px-1 py-[0.035rem] text-left outline-none"
                value={option}
              >
                {({ active, selected }) => (
                  <div
                    className={`rounded-full p-0.5 px-3 font-medium text-btn-navy transition-colors duration-[50ms] dark:text-btn-brown ${
                      active
                        ? "bg-sort-light-brown active:bg-card-navy active:text-card-brown dark:bg-sort-light-navy dark:active:bg-btn-brown dark:active:text-card-navy"
                        : ""
                    }`}
                  >
                    <span className="block">{option.label}</span>
                    {selected && (
                      <span className="absolute inset-y-0 right-0 flex items-center pr-3">
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
