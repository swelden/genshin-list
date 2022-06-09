interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  isCircle?: boolean;
  isColorInversed?: boolean;
  ariaHaspopup?: boolean;
  ariaExpanded?: boolean;
}

// TODO: add link button that has same styles as Button (mainly for 404 page)

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  className = "",
  isCircle = false,
  isColorInversed = false,
  ariaHaspopup,
  ariaExpanded,
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex cursor-pointer items-center justify-center rounded-full border-0 font-medium shadow-sm outline-none ring-yellow-500 ring-offset-zinc-100 transition duration-75 hover:border-2 hover:shadow-inner focus-visible:border-2 focus-visible:shadow-inner focus-visible:ring-2 focus-visible:ring-offset-2 active:border-opacity-70 active:bg-ui-bg-click active:text-white active:shadow-lg dark:ring-yellow-600 dark:ring-offset-zinc-900 ${
        isCircle ? "h-8 w-8" : "h-9 w-full"
      } ${
        isColorInversed
          ? "border-white bg-ui text-ui-contrast dark:border-gray-700 dark:bg-ui-contrast dark:text-ui"
          : "border-gray-700 bg-ui-contrast text-ui dark:border-white dark:bg-ui dark:text-ui-contrast"
      } ${className}`}
      aria-haspopup={ariaHaspopup}
      aria-expanded={ariaExpanded}
    >
      {children}
    </button>
  );
};

type CircleButtonProps = Omit<ButtonProps, "isCircle">;

export const CircleButton: React.FC<CircleButtonProps> = ({
  children,
  onClick,
  className = "",
}) => {
  return (
    <div
      onClick={onClick}
      className="group relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-full"
    >
      <Button
        className={`peer z-[1] group-hover:h-9 group-hover:w-9 group-hover:border-2 group-hover:shadow-inner ${className}`}
        isCircle={true}
      >
        {children}
      </Button>
      <div className="absolute top-1/2 left-1/2 z-0 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-ui-outline transition-[height,_width] duration-300 hover:transition-none group-hover:h-8 group-hover:w-8 peer-focus-visible:h-8 peer-focus-visible:w-8"></div>
    </div>
  );
};

export default Button;
