type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
};

const Button: React.FC<ButtonProps> = ({ className = "", ...props }) => {
  return (
    <div className="w-full">
      <button
        className={`w-full bg-primary hover:border-primary cursor-pointer rounded p-2 text-black shadow-md mt-2 disabled:bg-gray-400 disabled:text-white disabled:cursor-not-allowed transition ${className}`}
        {...props}
      >
        {props.children}
      </button>
    </div>
  );
};

export default Button;
