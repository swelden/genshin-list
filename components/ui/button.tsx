import * as React from "react";
import Link from "next/link";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonSizeClassNames = {
  default: "h-11 px-5 py-2 text-xl", // medium
  big: "h-16 text-2xl",
  icon: "aspect-square h-11 w-11 text-xl sm:aspect-auto sm:w-24 sm:px-5 sm:py-2",
  small: "h-10 px-5 py-1 text-base",
  xsmall: "h-8 px-4 py-1 text-base",
} as const;

const buttonVariants = cva(
  "inline-flex flex-nowrap items-center justify-center whitespace-nowrap rounded-full outline-none ring-0 ring-inset transition disabled:pointer-events-none disabled:bg-transparent disabled:text-[#8D8F90] disabled:ring-3 disabled:ring-[#3F4854] hocus:shadow-inner hocus:ring-3",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground ring-primary-ring active:bg-primary-active active:text-primary-foreground-active active:ring-primary-ring-active",
        secondary:
          "bg-secondary text-secondary-foreground ring-secondary-ring active:bg-secondary-active active:text-secondary-foreground-active active:ring-secondary-ring-active",
        brown:
          "bg-btn-brown text-btn-brown-foreground ring-btn-brown-ring active:bg-btn-brown-active active:text-btn-brown-active-foreground active:ring-btn-brown-active-ring",
        blue: "bg-btn-blue text-btn-blue-foreground ring-btn-blue-ring active:bg-btn-blue-active active:text-btn-blue-active-foreground active:ring-btn-blue-active-ring",
        dark: "bg-btn-dark text-btn-dark-foreground active:!bg-btn-dark-active active:!text-btn-dark-active-foreground hocus:bg-btn-dark-hover hocus:ring-0",
      },
      size: buttonSizeClassNames,
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

const CircleButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, children, ...props }, ref) => {
    return (
      <button
        className={cn(
          "group relative flex cursor-pointer items-center justify-center rounded-full",
          "size-14",
          className,
        )}
        ref={ref}
        {...props}
      >
        <Button
          variant={variant}
          className={cn(
            "peer z-[1] p-0 transition-all duration-300 group-hover:shadow-inner group-hover:ring-3 group-hover:transition-none",
            "size-11 group-hover:size-[3.25rem]",
          )}
          asChild
        >
          <div>{children}</div>
        </Button>
        <div
          className={cn(
            "absolute left-1/2 top-1/2 z-0 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary-outline transition-all duration-300",
            "size-14 group-hover:size-12",
            variant === "brown" && "bg-btn-brown-outline",
            variant === "blue" && "bg-btn-blue-outline",
          )}
        ></div>
      </button>
    );
  },
);
CircleButton.displayName = "CircleButton";

const LinkButton = React.forwardRef<
  React.ElementRef<typeof Link>,
  React.ComponentPropsWithoutRef<typeof Link>
>(({ className, href, ...props }, ref) => (
  <Link
    ref={ref}
    href={href}
    className={cn(buttonVariants({ variant: "default" }), className)}
    {...props}
  />
));
LinkButton.displayName = "LinkButton";

export {
  Button,
  buttonSizeClassNames,
  buttonVariants,
  CircleButton,
  LinkButton,
};
