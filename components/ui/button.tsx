import * as React from "react";
import Link from "next/link";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full text-xl outline-none ring-0 ring-inset transition disabled:pointer-events-none disabled:opacity-50 hocus:shadow-inner hocus:ring-3",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground ring-primary-ring active:bg-primary-active active:text-primary-foreground-active active:ring-primary-ring-active",
        secondary:
          "bg-secondary text-secondary-foreground ring-secondary-ring active:bg-secondary-active active:text-secondary-foreground-active active:ring-secondary-ring-active",
        brown:
          "bg-genshin-brown text-genshin-blue ring-ring-yellow active:bg-genshin-brown-active active:text-genshin-brown-foreground-active active:ring-ring-white-active",
        blue: "bg-genshin-blue text-genshin-brown ring-ring-yellow active:bg-genshin-blue-active active:text-genshin-blue-foreground-active active:ring-ring-yellow-active",
        disabledBrown: "", // TODO: implement
      },
      size: {
        default: "h-11 px-5 py-2", // medium
        icon: "h-11 w-24 px-5 py-2",
        full: "h-11 w-full py-2",
        small: "h-10 px-5 text-base",
        big: "h-16 text-2xl",
      },
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
  ({ className, children, ...props }, ref) => {
    return (
      <button
        className={cn(
          "group relative flex cursor-pointer items-center justify-center rounded-full",
          "h-14 w-14",
          className,
        )}
        ref={ref}
        {...props}
      >
        <Button
          className={cn(
            "peer z-[1] p-0 transition-all duration-300 group-hover:shadow-inner group-hover:ring-3 group-hover:transition-none",
            "h-11 w-11 group-hover:h-[3.25rem] group-hover:w-[3.25rem]",
          )}
          asChild
        >
          <div>{children}</div>
        </Button>
        <div
          className={cn(
            "absolute left-1/2 top-1/2 z-0 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary-outline transition-all duration-300",
            "h-14 w-14 group-hover:h-12 group-hover:w-12",
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

export { Button, buttonVariants, CircleButton, LinkButton };
