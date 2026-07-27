import React from 'react';
import { motion } from 'framer-motion';

export const PrimaryButton = ({ children, onClick, icon: Icon, type = 'button', disabled = false, className = '' }) => {
  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.03 }}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        inline-flex items-center gap-2 px-5 py-2.5 rounded-xl
        bg-[#A96A80] text-white text-sm font-bold
        hover:bg-[#945A70] active:bg-[#945A70]
        shadow-soft-sm hover:shadow-soft
        transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-[#A96A80]/40 focus:ring-offset-2 focus:ring-offset-white
        ${disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : 'cursor-pointer'}
        ${className}
      `}
    >
      {Icon && <Icon className="w-4 h-4 flex-shrink-0" />}
      <span>{children}</span>
    </motion.button>
  );
};
