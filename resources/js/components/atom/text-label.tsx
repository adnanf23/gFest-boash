import React from "react";

type TextAlign = "left" | "center" | "right" | "justify";
type TextColor =
  | "zinc-600"
  | "white"
  | "black"
  | "yellow-300"
  | "yellow-400"
  | "gray-500"
  | "gray-700";

interface ParagraphProps {
  align?: TextAlign;
  children: React.ReactNode;
  className?: string;
  textColor?: TextColor | string; // string agar bisa pakai hex manual
}

export default function TextLabel({
  children,
  align = "left",
  className = "",
}: ParagraphProps) {
  const validAlignments: TextAlign[] = ["left", "center", "right", "justify"];
  const alignmentClass = validAlignments.includes(align)
    ? `text-${align}`
    : "text-center";



  return (
    <div
      className={`
        ${alignmentClass}
        md:text-2xl
        ${className}`}
    >
      {children}
    </div>
  );
}
