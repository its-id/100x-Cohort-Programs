type InputProps = {
  type: 'text' | 'email' | 'number' | 'password' | 'radio';
  name?: string;
  value?: string | number | boolean;
  defaultValue?: string | number;
  defaultChecked?: boolean;
  checked?: boolean;
  placeholder?: string;
  styleClass?: string;
  variant?: 'primary' | 'danger' | 'success' | 'dark';
  id?: string;
  autoComplete?: 'email' | 'current-password' | 'new-password' | 'off';
  onChange?: (e: any) => void;
  onClick?: (e: any) => void;
};

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

const Input = ({
  type = 'text',
  name = '',
  value,
  defaultValue = '',
  defaultChecked = false,
  checked = false,
  placeholder = '',
  styleClass = '',
  variant = 'primary',
  id = '',
  autoComplete = 'off',
  onChange,
  onClick,
}: InputProps) => {
  return type === 'radio' ? (
    <input
      id={id}
      name={name}
      autoComplete={autoComplete}
      type='radio'
      {...(checked ? { checked } : { defaultChecked: defaultChecked })}
      className={classNames(
        variant === 'primary'
          ? 'focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 focus:shadow-[0_0_0_0.3rem_#ede9fe]'
          : variant === 'danger'
          ? 'focus:ring-red-500 h-4 w-4 text-red-600 border-gray-300 focus:shadow-[0_0_0_0.3rem_#fee2e2]'
          : variant === 'success'
          ? 'focus:ring-green-500 h-4 w-4 text-green-600 border-green-300 focus:shadow-[0_0_0_0.3rem_#dcfce7]'
          : 'focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300 focus:shadow-[0_0_0_0.3rem_#f3f4f6]',
        `shadow-sm block w-full sm:text-sm border-gray-300 rounded-md ${styleClass}`
      )}
      onClick={onClick}
    />
  ) : (
    <input
      id={id}
      name={name}
      autoComplete={autoComplete}
      {...(value && (typeof value === 'string' || typeof value === 'number')
        ? { value }
        : { defaultValue: defaultValue })}
      type={type}
      className={classNames(
        variant === 'primary'
          ? 'border-cyan-300 focus:ring-cyan-300 focus:shadow-[0_0_0_0.3rem_#0e7490]'
          : variant === 'danger'
          ? 'border-red-300 focus:ring-red-300 focus:border-red-300 focus:shadow-[0_0_0_0.3rem_#7f1d1d]'
          : variant === 'success'
          ? 'border-emerald-300 focus:ring-emerald-300 focus:border-emerald-300 focus:shadow-[0_0_0_0.3rem_#14532d]'
          : 'border-gray-300 focus:ring-gray-300 focus:border-gray-300 focus:shadow-[0_0_0_0.3rem_#6b7280]',
        `shadow-sm focus-visible:outline-none block w-full px-3 py-2 border sm:text-sm rounded-md ${styleClass}`
      )}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};

export default Input;
