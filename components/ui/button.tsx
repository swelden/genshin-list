import Link from "next/link";
import { forwardRef } from "react";

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

const Button = forwardRef<React.ElementType, ButtonProps>(
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
    ref,
  ) => {
    const ButtonType = as;

    return (
      <ButtonType
        ref={ref}
        onClick={onClick}
        className={`flex cursor-pointer items-center rounded-full shadow-sm hover:shadow-inner focus-visible:shadow-inner active:bg-btn-brown-click active:text-white active:shadow-lg active:ring-opacity-70 active:transition-colors dark:active:bg-btn-brown-click dark:active:text-white dark:active:ring-opacity-70 ${
          isCircle ? "h-8 w-8" : "h-9 w-full hover:ring-2"
        } ${as === "button" ? "key-focus key-focus-body" : ""} ${
          isColorInversed
            ? "bg-btn-brown text-btn-navy ring-white hover:ring-offset-white dark:bg-card-navy dark:text-btn-brown dark:ring-gray-700 dark:hover:ring-offset-gray-700"
            : "bg-card-navy text-btn-brown ring-gray-700 hover:ring-offset-gray-700 dark:bg-btn-brown dark:text-btn-navy dark:ring-white dark:hover:ring-offset-white"
        } ${justifyContent} ${className}`}
        aria-haspopup={ariaHaspopup}
        aria-expanded={ariaExpanded}
        aria-label={ariaLabel}
      >
        {children}
      </ButtonType>
    );
  },
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
    <Link
      href={url}
      className={`key-focus key-focus-body rounded-full ${className}`}
    >
      <Button isColorInversed={isColorInversed} as="div">
        {children}
      </Button>
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
        className={`peer z-[1] transition-[height,_width] duration-200 group-hover:h-9 group-hover:w-9 group-hover:shadow-inner group-hover:ring-2 group-hover:transition-none ${className}`}
        isCircle={true}
        ariaHaspopup={ariaHaspopup}
        ariaExpanded={ariaExpanded}
        as="div"
      >
        {children}
      </Button>
      <div className="absolute left-1/2 top-1/2 z-0 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-btn-outline"></div>
    </button>
  );
};

export default Button;
