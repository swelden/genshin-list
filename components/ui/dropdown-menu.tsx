"use client";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Listbox, ListboxProps, Transition } from "@headlessui/react";
import { VariantProps, cva } from "class-variance-authority";
import { Check } from "lucide-react";
import * as React from "react";

// TODO: move dropdown styles here [these are currently button styles]
const dropdownVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "key-focus key-focus-body bg-primary text-xl text-primary-foreground shadow-sm ring-gray-700 hover:shadow-inner hover:ring-2 hover:ring-offset-gray-700 focus-visible:shadow-inner active:bg-primary-active active:text-white active:shadow-lg active:ring-opacity-70 dark:ring-white dark:hover:ring-offset-white",
        secondary: "",
      },
      size: {
        default: "h-11 px-5 py-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

interface DropdownOption<T> {
  label: string;
  value: T;
}

export type DropdownMenuProps<
  T,
  TTag extends React.ElementType = "ul",
  TType = DropdownOption<T>,
  TActualType extends {} = DropdownOption<T>,
> = Omit<ListboxProps<TTag, TType, TActualType>, "value, onChange, children"> &
  VariantProps<typeof dropdownVariants> & {
    options: DropdownOption<T>[];
    setValue: React.Dispatch<React.SetStateAction<T>>;
    // ref: React.Ref<HTMLUListElement>;
  };

// TODO: make wrapper for each headlessui listbox element for reusability
// DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger

// <DropdownMenu>
//  <DropdownMenuTrigger>Sort By {sortValue}</DropdownMenuTrigger>
//   <DropdownMenuContent>
//     <DropdownMenuItem>Version</DropdownMenuItem>
//     <DropdownMenuItem>Element</DropdownMenuItem>
//     <DropdownMenuItem>...</DropdownMenuItem>
//   </DropdownMenuContent>
// </DropdownMenu>

const DropdownMenu = <T,>({
  options,
  setValue,
  className,
  variant,
  size,
  ...props
}: DropdownMenuProps<T>) => {
  const [selectedOption, setSelectedOption] = React.useState(options[0]);

  const handleChange = (event: DropdownOption<T>) => {
    setSelectedOption(event);
    setValue(event.value);
  };

  return (
    <Listbox
      value={selectedOption}
      onChange={handleChange}
      by="value"
      // className={cn(dropdownVariants({ variant, size, className }))}
      {...props}
    >
      {/* TODO: remove w-full */}
      <div className={cn("relative w-full", className)}>
        <Listbox.Button as={Button} className="w-full justify-between truncate">
          <span className="w-full truncate text-left">
            Sort by {selectedOption.label}
          </span>
          <Icons.dropdown className="h-7 w-7" />
        </Listbox.Button>
        <Transition
          as={React.Fragment}
          enter="transition duration-100 ease-out"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-75 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
        >
          <Listbox.Options className="absolute z-10 flex w-full flex-col gap-[0.125rem] rounded-3xl bg-select p-[0.3125rem] text-select-foreground shadow-xl ring-1 ring-black/20 focus:outline-none">
            {options.map((option) => (
              <Listbox.Option
                key={option.label}
                className="flex h-11 text-xl outline-none"
                value={option}
              >
                {({ active, selected }) => (
                  <div
                    className={cn(
                      "relative flex h-full w-full select-none items-center rounded-full p-0.5 px-3 font-medium transition-colors duration-[50ms]",
                      active &&
                        "bg-select-hover active:bg-select-active active:text-select-active-foreground",
                    )}
                  >
                    <span className="block">{option.label}</span>
                    {selected && (
                      <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                        <Check className="h-6 w-6" strokeWidth={4} />
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
DropdownMenu.displayName = "DropdownMenu";

export { DropdownMenu, dropdownVariants };
