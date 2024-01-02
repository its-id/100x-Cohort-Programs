type ButtonProps = {
  text: string;
  styleClass?: string;
  disabled?: boolean;
  variant?: 'primary' | 'danger' | 'success' | 'dark';
  onClick?: (e: any) => void;
};

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

const Button = ({
  text = '',
  styleClass = '',
  variant = 'primary',
  disabled = false,
  onClick,
}: ButtonProps) => {
  return (
    <button
      disabled={disabled}
      type='button'
      className={classNames(
        variant === 'primary'
          ? `bg-cyan-600 hover:bg-cyan-700 border-cyan-300 focus:ring-cyan-300 focus:shadow-[0_0_0_0.3rem_#0e7490]`
          : variant === 'danger'
          ? `bg-red-600 hover:bg-red-700 border-red-300 focus:ring-red-300 focus:border-red-300 focus:shadow-[0_0_0_0.3rem_#7f1d1d]`
          : variant === 'success'
          ? `bg-emerald-600 hover:bg-emerald-700 border-emerald-300 focus:ring-emerald-300 focus:border-emerald-300 focus:shadow-[0_0_0_0.3rem_#14532d]`
          : `bg-gray-500 hover:bg-gray-600 border-gray-300 focus:ring-gray-300 focus:border-gray-300 focus:shadow-[0_0_0_0.3rem_#6b7280]`,
        `w-full inline-flex ${
          disabled && 'hidden'
        } items-center justify-center px-4 py-2 focus-visible:outline-none border border-transparent text-base font-medium rounded-md shadow-sm text-white ${styleClass}`
      )}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
