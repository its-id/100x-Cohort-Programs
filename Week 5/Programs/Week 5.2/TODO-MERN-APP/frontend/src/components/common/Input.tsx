import React from 'react';

type InputProps = {
  type: string;
  name: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input = ({
  type = 'text',
  name = '',
  placeholder = '',
  onChange,
}: InputProps) => {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};

export default Input;
