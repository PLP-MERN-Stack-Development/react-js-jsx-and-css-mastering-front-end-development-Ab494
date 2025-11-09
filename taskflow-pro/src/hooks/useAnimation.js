import { useEffect, useState } from 'react';

export const useAnimation = (duration = 300) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  return isVisible;
};