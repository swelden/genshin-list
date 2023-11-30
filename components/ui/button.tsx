import * as React from "react";
import Link from "next/link";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "hocus:ring-3 inline-flex items-center justify-center whitespace-nowrap rounded-full text-xl outline-none ring-0 ring-inset transition disabled:pointer-events-none disabled:opacity-50 hocus:shadow-inner",
  {
    variants: {
      variant: {
        default:
          "ring-primary-ring active:ring-primary-ring/70 bg-primary text-primary-foreground active:bg-primary-active active:text-white",
        secondary: "",
      },
      size: {
        default: "h-11 px-5 py-2",
        icon: "h-11 w-24 px-5 py-2",
        full: "h-11 w-full py-2",
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

// TODO: fix CircleButton Styles
const CircleButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <button
        className={cn(
          "group relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-full",
          className,
        )}
        ref={ref}
        {...props}
      >
        <Button
          className="group-hover:ring-3 peer z-[1] h-8 w-8 p-0 transition-all duration-200 group-hover:h-9 group-hover:w-9 group-hover:shadow-inner group-hover:transition-none"
          asChild
        >
          <div>{children}</div>
        </Button>
        <div className="absolute left-1/2 top-1/2 z-0 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary-outline"></div>
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
