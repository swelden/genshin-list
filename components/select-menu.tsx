import { Icons } from "@/components/icons";
import { Listbox, Transition } from "@headlessui/react";
import { Fragment } from "react";

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
        <Listbox.Button className="key-focus key-focus-section relative w-full cursor-pointer rounded-md bg-zinc-100 py-1.5 pl-4 pr-10 text-left shadow-sm ring-1 ring-black/5 transition-colors hover:bg-zinc-200 dark:bg-zinc-700 hover:dark:bg-zinc-600">
          <span className="block truncate">{currentValue.label}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-gray-400">
            <Icons.dropdown className="h-6 w-6 min-w-[1.5rem]" />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="scrollbar absolute z-10 mt-1 max-h-60 w-full overflow-y-auto rounded-md bg-zinc-50 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-zinc-600 sm:max-h-80 sm:text-sm">
            {options.map(({ label, value }, index) => (
              <Listbox.Option
                key={index}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-8 pr-4 outline-none ${
                    active
                      ? "bg-amber-100 text-amber-900 dark:bg-zinc-700 dark:text-amber-50"
                      : "text-zinc-900 dark:text-zinc-100"
                  }`
                }
                value={value}
              >
                {({ selected }) => (
                  <>
                    <span className="block truncate">{label}</span>
                    {selected && (
                      <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-amber-600 dark:text-amber-400">
                        <Icons.checkmark className="h-4 w-4" />
                      </span>
                    )}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};
