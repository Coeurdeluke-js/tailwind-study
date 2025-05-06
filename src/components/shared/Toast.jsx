import React, { useEffect } from 'react';
import { CheckCircle, AlertCircle, X } from 'lucide-react';

const Toast = ({ message, type = 'success', onClose, duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className="fixed bottom-4 right-4 z-[200] animate-slideInRight">
      <div className={`flex items-center p-4 rounded-lg shadow-lg ${
        type === 'success' ? 'bg-green-600' : 'bg-red-600'
      } text-white max-w-md`}>
        {type === 'success' ? (
          <CheckCircle className="mr-3" size={20} />
        ) : (
          <AlertCircle className="mr-3" size={20} />
        )}
        <p className="flex-1">{message}</p>
        <button 
          onClick={onClose}
          className="ml-3 text-white hover:text-white/80 transition-colors"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
};

export default Toast;