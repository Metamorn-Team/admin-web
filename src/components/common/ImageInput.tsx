"use client";

import React, { useRef } from "react";

type ImageInputProps = {
  onChange: (file: File | null) => void;
  previewUrl?: string;
  className?: string;
};

export default function ImageInput({
  onChange,
  previewUrl,
  className,
}: ImageInputProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    onChange(file);
  };

  return (
    <div className={className}>
      {previewUrl && (
        <img
          src={previewUrl}
          alt="Preview"
          className="w-32 h-32 object-cover border border-[#bfae96] rounded mb-2 shadow"
        />
      )}
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        ref={inputRef}
        className="block text-sm text-[#2a1f14] file:bg-[#bfae96] file:text-white file:rounded file:px-3 file:py-1 file:border-none"
      />
    </div>
  );
}
