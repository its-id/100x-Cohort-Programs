import { useEffect, useState } from 'react';

type InputProps = {
  type: 'text' | 'email' | 'number' | 'password';
  name?: string;
  value?: string | number;
  defaultValue?: string | number;
  placeholder?: string;
  styleClass?: string;
  variant?: 'primary' | 'danger' | 'success' | 'dark';
  id?: string;
  autoComplete?: 'email' | 'current-password' | 'new-password' | 'off';
  onChange?: (e: any) => void;
};

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

const Input = ({
  type = 'text',
  name = '',
  value: propInputVal = '',
  defaultValue = '',
  placeholder = '',
  styleClass = '',
  variant = 'primary',
  id = '',
  autoComplete = 'off',
  onChange,
}: InputProps) => {
  const [inputValue, setInputValue] = useState(propInputVal);

  useEffect(() => {
    setInputValue(propInputVal);
  }, [propInputVal]);

  const onInputChangeHandler = (e: any) => {
    setInputValue(e.target.value);
    onChange && onChange(e);
  };

  return (
    <input
      id={id}
      name={name}
      autoComplete={autoComplete}
      value={inputValue || (defaultValue && defaultValue)}
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
      onChange={onInputChangeHandler}
    />
  );
};

export default Input;
