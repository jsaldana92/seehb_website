// src/components/HoverOrTouchHandler.jsx
import { useState, useCallback } from 'react';

const HoverOrTouchHandler = ({ children, className = '' }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  const handleTouchStart = useCallback(() => {
    setIsHovered((prev) => !prev);
  }, []);

  return (
    <div
      className={className}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
    >
      {children(isHovered)}
    </div>
  );
};

export default HoverOrTouchHandler;
