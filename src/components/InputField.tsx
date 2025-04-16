/* eslint-disable react/require-default-props */

'use client';

import React from 'react';

interface InputFieldProps {
  label: string;
  id: string;
  value: number;
  onChange: (value: number) => void;
  type?: 'number' | 'text';
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  id,
  value,
  onChange,
  type = 'number',
  placeholder,
  min,
  max,
  step,
  disabled = false,
}) => (
  <div className="mb-4 flex items-center">
    <label htmlFor={id} className="w-1/3 text-lg font-medium text-gray-700">
      {label}
      :
    </label>
    <input
      type={type}
      id={id}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-2/3 rounded-md border border-gray-300 p-2 focus:outline-none focus:ring focus:ring-blue-300"
      placeholder={placeholder}
      min={min}
      max={max}
      step={step}
      disabled={disabled}
    />
  </div>
);

export default InputField;
