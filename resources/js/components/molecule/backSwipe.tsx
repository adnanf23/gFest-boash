
import React from 'react';

interface GlassButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    href?: string;
    className?: string;
}

const GlassButton: React.FC<GlassButtonProps> = ({ 
    children, 
    onClick, 
    href,
    className = '' 
}) => {
    const baseClasses = `
    fixed top-3 left-4
        inline-flex items-center justify-center
        px-9 py-1 rounded-full
        font-medium text-black bg-[white] backdrop-blur-md
        border border-white/20
        shadow-lg shadow-black/10
        transition-all duration-300 hover:text-white
        hover:bg-white/20 hover:border-white/30
        hover:shadow-xl hover:shadow-black/20
        hover:scale-105
        active:scale-95
        ${className}
    `;

    if (href) {
        return (
            <a href={href} className={baseClasses}>
                {children}
            </a>
        );
    }

    return (
        <button onClick={onClick} className={baseClasses}>
            {children}
        </button>
    );
};

export default GlassButton;