interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  isCircle?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  className = "",
  isCircle = false,
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex cursor-pointer items-center justify-center rounded-full border-0 border-white bg-ui font-medium text-ui-contrast shadow-sm transition duration-75 hover:border-2 hover:shadow-inner focus-visible:border-2 focus-visible:shadow-inner active:border-opacity-70 active:bg-ui-bg-click active:text-white active:shadow-lg ${
        isCircle ? "h-8 w-8" : "h-9 w-full"
      } ${className}`}
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
        className={`peer z-[1] group-hover:border-2 group-hover:shadow-inner ${className}`}
        isCircle={true}
      >
        {children}
      </Button>
      <div className="absolute top-1/2 left-1/2 z-0 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-ui-outline transition-[height,_width] duration-200 group-hover:h-7 group-hover:w-7 peer-focus-visible:h-7 peer-focus-visible:w-7"></div>
    </div>
  );
};

export default Button;
