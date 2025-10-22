type TextAlign = "left" | "center" | "right" | "justify";

interface ParagraphProps {
  align?: TextAlign;
  children: React.ReactNode;
  className?: string;
  fontSize?: string;
}

export default function Paragraph({
    children, 
    align,
    fontSize= "lg"}: ParagraphProps ) {
    return(
        <>
        <p
        className={`
        text-${fontSize} text-${align} text-[#969696]
        `}>
            {children}
        </p>
        </>
    )
}