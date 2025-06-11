"use client";

import React from "react";

type TableProps = {
  headers: string[];
  rows: React.ReactNode[][];
  className?: string;
};

export default function Table({ headers, rows, className }: TableProps) {
  return (
    <div className={`overflow-auto ${className}`}>
      <table className="w-full text-sm text-left border border-[#bfae96] bg-[#fdf8ef]">
        <thead className="bg-[#d4c8b0] text-[#2a1f14]">
          <tr>
            {headers.map((header, idx) => (
              <th key={idx} className="px-4 py-2 border border-[#bfae96]">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIdx) => (
            <tr key={rowIdx} className="hover:bg-[#f3ebdc]">
              {row.map((cell, cellIdx) => (
                <td key={cellIdx} className="px-4 py-2 border border-[#bfae96]">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
