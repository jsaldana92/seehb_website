import { useState, useCallback, useRef } from 'react';

const HoverOrTouchHandler = ({ children, className = '' }) => {
  const [isHovered, setIsHovered] = useState(false);
  const touchMoved = useRef(false);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  const handleTouchStart = useCallback(() => {
    touchMoved.current = false;
  }, []);

  const handleTouchMove = useCallback(() => {
    touchMoved.current = true;
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (!touchMoved.current) {
      setIsHovered((prev) => !prev);
    }
  }, []);

  return (
    <div
      className={className}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {children(isHovered)}
    </div>
  );
};

export default HoverOrTouchHandler;
