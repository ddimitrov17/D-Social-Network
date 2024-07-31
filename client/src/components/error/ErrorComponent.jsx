import React, { useEffect } from 'react';
import './ErrorComponent.css';

const ErrorComponent = ({ message, onClose }) => {
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

export default ErrorComponent;
