import React from "react";

type TextAlign = "left" | "center" | "right" | "justify";

interface HeadingProps {
  align?: TextAlign;
  children: React.ReactNode;
  className?: string;
  fontWeight?: string;
}

export default function H1({
  align = "left",
  children,
  className = "",
  fontWeight = "font-bold ",
}: HeadingProps) {
  const validAlignments: TextAlign[] = ["left", "center", "right", "justify"];
  const alignmentClass = validAlignments.includes(align) ? `text-${align}` : "text-left";

  return (
    <h1
      className={`
        ${alignmentClass}
        ${fontWeight} text-white
        text-3xl
        lg:text-5xl
        ${className}
      `.trim().replace(/\s+/g, " ")}
    >
      {children}
    </h1>
  );
}

export function H2({
  align = "left",
  children,
  className = "",
}: Omit<HeadingProps, "fontWeight">) {
  const validAlignments: TextAlign[] = ["left", "center", "right", "justify"];
  const alignmentClass = validAlignments.includes(align) ? `text-${align}` : "text-left";

  return (
    <h2
      className={`
        text-3xl text-white
        md:text-4xl
        font-bold
        ${alignmentClass}
        ${className}
      `.trim().replace(/\s+/g, " ")}
    >
      {children}
    </h2>
  );
}

export function H3({
  align = "left",
  children,
  className = "",
}: Omit<HeadingProps, "fontWeight">) {
  const validAlignments: TextAlign[] = ["left", "center", "right", "justify"];
  const alignmentClass = validAlignments.includes(align) ? `text-${align}` : "text-left";

  return (
    <h3
      className={`
        text-2xl text-white
        font-bold
        ${alignmentClass}
        ${className}
      `.trim().replace(/\s+/g, " ")}
    >
      {children}
    </h3>
  );
}
