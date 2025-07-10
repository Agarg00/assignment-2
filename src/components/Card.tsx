import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface CardProps {
  title?: string;
  subtitle?: string;
  description?: string;
  icon?: LucideIcon;
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  gradient?: boolean;
}

const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  description,
  icon: Icon,
  className = '',
  children,
  onClick,
  gradient = false
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      transition={{ type: "spring", stiffness: 300 }}
      className={`
        relative rounded-2xl p-6 cursor-pointer
        ${gradient 
          ? 'bg-gradient-to-br from-purple-600 to-purple-700' 
          : 'bg-white/5 backdrop-blur-sm border border-white/10'
        }
        hover:border-white/20 transition-all duration-300
        ${className}
      `}
      onClick={onClick}
    >
      {Icon && (
        <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center mb-4">
          <Icon className="w-6 h-6 text-white" />
        </div>
      )}
      
      {title && (
        <h3 className="text-white text-xl font-bold mb-2">{title}</h3>
      )}
      
      {subtitle && (
        <p className="text-white/70 text-sm mb-2">{subtitle}</p>
      )}
      
      {description && (
        <p className="text-white/60 text-sm">{description}</p>
      )}
      
      {children}
    </motion.div>
  );
};

export default Card;