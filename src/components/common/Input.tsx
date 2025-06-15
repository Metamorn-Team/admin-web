"use client";

import classNames from "classnames";

interface InputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  error?: boolean;
  className?: string;
}

export default function Input({
  value,
  onChange,
  type = "text",
  placeholder,
  required,
  minLength,
  maxLength,
  error = false,
  className,
  ...rest
}: InputProps) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      minLength={minLength}
      maxLength={maxLength}
      {...rest}
      className={classNames(
        `w-full p-2 rounded-md outline-none transition bg-[#f9f5ec]
         ${error ? "border-red-500" : "border-[#bfae96]"}
         border shadow-[2px_2px_0_#8c7a5c]
         focus:ring-2 focus:ring-[#e0d5c0] focus:border-[#a8987e] text-base`,
        className
      )}
    />
  );
}
