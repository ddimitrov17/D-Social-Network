import React, { useEffect } from 'react';
import './ErrorComponent.css';

export default function ErrorComponent({ message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 1500); 
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="error-message">
      {message}
    </div>
  );
};

