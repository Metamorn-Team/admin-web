"use client";

import classNames from "classnames";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "ghost";
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
};

export default function Button({
  children,
  onClick,
  className,
  variant = "primary",
  type = "button",
  disabled = false,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classNames(
        "text-sm px-3 py-1.5 rounded border transition font-medium",
        "disabled:opacity-50 disabled:cursor-not-allowed shadow-[2px_2px_0_#5c4b32]",
        {
          "bg-[#bfae96] text-white border-[#5c4b32] hover:bg-[#a79b84]":
            variant === "primary",
          "bg-[#eae0cf] text-[#2a1f14] border-[#a8987e] hover:bg-[#d6cbb3]":
            variant === "ghost",
        },
        className
      )}
    >
      {children}
    </button>
  );
}
