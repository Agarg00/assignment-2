import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  showNavigation?: boolean;
  onPrevious?: () => void;
  onNext?: () => void;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  showNavigation = false,
  onPrevious,
  onNext,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
            onClick={onClose}
          >
            <div
              className="relative w-full max-w-6xl flex h-full items-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute -top-0 -right-4 w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors z-10"
              >
                <X className="w-5 h-5 text-white" />
              </button>

              {/* Navigation arrows */}
              {showNavigation && (
                <>
                  <button
                    onClick={onPrevious}
                    className="absolute left-6 text-white/50 hover:text-white top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center transition-colors z-10"
                  >
                    <ChevronLeft className="size-12" />
                  </button>
                  <button
                    onClick={onNext}
                    className="absolute right-6 text-white/50 hover:text-white top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center transition-colors z-10"
                  >
                    <ChevronRight className="size-12" />
                  </button>
                </>
              )}

              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Modal;
