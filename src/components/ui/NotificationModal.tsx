import React, { useEffect } from 'react';
import { Card, CardContent } from './card';
import { X } from 'lucide-react';

interface NotificationModalProps {
  open: boolean;
  onClose: () => void;
  message: string;
  timeout?: number; // ms
  color?: string; // e.g. 'green', 'red', etc.
}

const NotificationModal: React.FC<NotificationModalProps> = ({ open, onClose, message, timeout = 2000, color }) => {
  useEffect(() => {
    if (!open) return;
    const timer = setTimeout(onClose, timeout);
    return () => clearTimeout(timer);
  }, [open, timeout, onClose]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="absolute inset-0" onClick={onClose} />
      <Card className="relative w-full max-w-xs rounded-xl shadow-lg z-10">
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-700"
          onClick={onClose}
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>
        <CardContent className={`py-8 text-center text-base font-medium ${color === 'green' ? 'text-green-600' : 'text-gray-800'}`}>
          {message}
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificationModal; 