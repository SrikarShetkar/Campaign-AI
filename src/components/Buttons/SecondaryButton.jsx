import React from 'react';
import { motion } from 'framer-motion';

export const SecondaryButton = ({ children, onClick, icon: Icon, type = 'button', className = '' }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      type={type}
      onClick={onClick}
      className={`pill-btn btn-secondary ${className}`}
    >
      {Icon && <Icon className="w-4 h-4" />}
      <span>{children}</span>
    </motion.button>
  );
};
