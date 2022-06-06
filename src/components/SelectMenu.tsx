import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { DropDownIcon } from "./icons";

export interface SelectOption<T> {
  label: string;
  value: T;
}

interface SelectMenuProps<T> {
  options: SelectOption<T>[];
  currentValue: SelectOption<T>;
  handleChange: (value: T) => void;
}

export const SelectMenu = <T extends {}>({
  options,
  currentValue,
  handleChange,
}: SelectMenuProps<T>) => {
  return (
    <Listbox value={currentValue.value} onChange={handleChange}>
      <div className="relative">
        <Listbox.Button className="text-light-900 relative w-full cursor-pointer rounded-md border border-zinc-700 bg-zinc-600 py-1.5 pr-10 pl-4 text-left shadow-md transition-colors hover:bg-zinc-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2">
          <span className="block truncate">{currentValue.label}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-gray-400">
            <DropDownIcon />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="scrollbar absolute z-10 mt-1 max-h-60 w-full overflow-y-auto rounded-md bg-card-title py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:max-h-80 sm:text-sm">
            {options.map(({ label, value }, index) => (
              <Listbox.Option
                key={index}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-8 pr-4 ${
                    active
                      ? "bg-amber-100 text-amber-900"
                      : "text-card-contrast"
                  }`
                }
                value={value}
              >
                <span className="block truncate">{label}</span>
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};
