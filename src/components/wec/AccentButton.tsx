import React from 'react';
import { COLORS } from './constants';

export type AccentButtonProps = {
    children: React.ReactNode;
    className?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    style?: React.CSSProperties;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
};

const AccentButton = ({ children, className = '', onClick, style = {}, type = 'button', disabled = false }: AccentButtonProps) => (
    <button
        type={type}
        onClick={onClick}
        className={`px-8 py-3 font-semibold text-white 
                   rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 
                   transform hover:scale-[1.03] active:scale-[0.98] focus:ring-4 focus:ring-offset-2 focus:ring-opacity-50 focus:ring-red-600 ${className}`}
        style={{ 
            backgroundColor: COLORS.accent, // Default accent background
            ...style // Allow style override for color/background
        }}
        disabled={disabled}
    >
        {children}
    </button>
);

export default AccentButton;
