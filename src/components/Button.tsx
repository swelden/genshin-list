import Link from "next/link";
import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  isCircle?: boolean;
  isColorInversed?: boolean;
  justifyContent?: string;
  ariaHaspopup?: boolean;
  ariaExpanded?: boolean;
  ariaLabel?: string;
  as?: React.ElementType;
}

const Button = React.forwardRef<React.ElementType, ButtonProps>(
  (
    {
      children,
      onClick,
      className = "",
      isCircle = false,
      isColorInversed = false,
      justifyContent = "justify-center",
      ariaHaspopup,
      ariaExpanded,
      ariaLabel,
      as = "button",
    },
    ref
  ) => {
    const ButtonType = as;

    return (
      <ButtonType
        ref={ref}
        onClick={onClick}
        className={`flex cursor-pointer items-center rounded-full border-0 shadow-sm transition duration-75 hover:border-2 hover:shadow-inner focus-visible:border-2 focus-visible:shadow-inner active:border-opacity-70 active:bg-ui-bg-click active:text-white active:shadow-lg dark:active:bg-ui-bg-click dark:active:text-white ${
          isCircle ? "h-8 w-8" : "h-9 w-full"
        } ${as === "button" ? "key-focus key-focus-body" : ""} ${
          isColorInversed
            ? "border-white bg-ui text-ui-contrast dark:border-gray-700 dark:bg-ui-contrast dark:text-ui"
            : "border-gray-700 bg-ui-contrast text-ui dark:border-white dark:bg-ui dark:text-ui-contrast"
        } ${justifyContent} ${className}`}
        aria-haspopup={ariaHaspopup}
        aria-expanded={ariaExpanded}
        aria-label={ariaLabel}
      >
        {children}
      </ButtonType>
    );
  }
);

Button.displayName = "Button";

type LinkButtonProps = Omit<
  ButtonProps,
  "isCircle" | "onClick" | "ariaHaspopup" | "ariaExpanded" | "ariaLabel" | "as"
> & { url: string };

export const LinkButton: React.FC<LinkButtonProps> = ({
  children,
  url,
  className = "",
  isColorInversed = false,
}) => {
  return (
    <Link href={url}>
      <a className={`key-focus key-focus-body rounded-full ${className}`}>
        <Button isColorInversed={isColorInversed} as="div">
          {children}
        </Button>
      </a>
    </Link>
  );
};

type CircleButtonProps = Omit<ButtonProps, "isCircle" | "as">;

export const CircleButton: React.FC<CircleButtonProps> = ({
  children,
  onClick,
  className = "",
  ariaHaspopup,
  ariaExpanded,
  ariaLabel,
}) => {
  return (
    <button
      onClick={onClick}
      className="key-focus key-focus-body group relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-full"
      aria-label={ariaLabel}
    >
      <Button
        className={`peer z-[1] transition-[height,_width] duration-300 group-hover:h-10 group-hover:w-10 group-hover:border-2 group-hover:shadow-inner group-hover:transition-none ${className}`}
        isCircle={true}
        ariaHaspopup={ariaHaspopup}
        ariaExpanded={ariaExpanded}
        as="div"
      >
        {children}
      </Button>
      <div className="absolute top-1/2 left-1/2 z-0 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-ui-outline"></div>
    </button>
  );
};

export default Button;
