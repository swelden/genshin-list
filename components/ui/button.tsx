import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import Link from "next/link";
import * as React from "react";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "key-focus key-focus-body w-full bg-card-navy text-btn-brown shadow-sm ring-gray-700 hover:shadow-inner hover:ring-2 hover:ring-offset-gray-700 focus-visible:shadow-inner active:bg-btn-brown-click active:text-white active:shadow-lg active:ring-opacity-70 dark:bg-btn-brown dark:text-btn-navy dark:ring-white dark:hover:ring-offset-white dark:active:bg-btn-brown-click dark:active:text-white dark:active:ring-opacity-70",
        secondary: "",
      },
      size: {
        default: "h-9 px-4 py-2",
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
          "key-focus key-focus-body group relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-full",
          className,
        )}
        ref={ref}
        {...props}
      >
        <Button
          className="peer z-[1] h-8 w-8 p-0 transition-all duration-200 group-hover:h-9 group-hover:w-9 group-hover:shadow-inner group-hover:ring-2 group-hover:transition-none"
          asChild
        >
          <div>{children}</div>
        </Button>
        <div className="absolute left-1/2 top-1/2 z-0 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-btn-outline"></div>
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
