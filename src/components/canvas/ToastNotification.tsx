import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, ShieldCheck, Copy, Download, Save } from 'lucide-react';

interface ToastNotificationProps {
  message: string | null;
  iconType?: 'check' | 'security' | 'copy' | 'download' | 'save';
  isVisible: boolean;
}

export const ToastNotification: React.FC<ToastNotificationProps> = ({
  message,
  iconType = 'check',
  isVisible,
}) => {
  const renderIcon = () => {
    switch (iconType) {
      case 'security':
        return <ShieldCheck size={18} className="text-emerald-400" />;
      case 'copy':
        return <Copy size={18} className="text-emerald-400" />;
      case 'download':
        return <Download size={18} className="text-emerald-400" />;
      case 'save':
        return <Save size={18} className="text-emerald-400" />;
      default:
        return <CheckCircle2 size={18} className="text-emerald-400" />;
    }
  };

  return (
    <AnimatePresence>
      {isVisible && message && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 15, scale: 0.95 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2.5 rounded-full bg-[#111C2D] text-white px-5 py-3 text-xs sm:text-sm font-medium shadow-2xl border border-white/10 pointer-events-none max-w-[90vw] text-center"
        >
          {renderIcon()}
          <span>{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
