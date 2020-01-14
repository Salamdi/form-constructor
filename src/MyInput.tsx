import React from 'react';

export interface InputProps {
  type?: string;
  placeholder?: string;
  value?: string;
  onChange: (value: string) => void;
}

const Input: React.FC<InputProps> = (
  {
    type = 'text',
    placeholder,
    value = '',
    onChange = () => null,
  }
) => {
  return (
    <input
      type={type}
    />
  );
};

export default Input;