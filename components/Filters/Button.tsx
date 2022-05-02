type ButtonProps = React.FC<{
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
}>;

const Button: ButtonProps = ({ children, onClick, className = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`flex h-9 w-full cursor-pointer items-center justify-center rounded-full border-0 border-white bg-ui font-medium text-ui-contrast shadow-sm transition duration-75 hover:border-2 hover:shadow-inner focus:border-2 focus:shadow-inner active:border-opacity-70 active:bg-ui-bg-click active:text-white active:shadow-lg ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
