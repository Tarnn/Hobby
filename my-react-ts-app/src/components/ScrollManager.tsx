import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollManager() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);

    // Add event listener for beforeunload to save scroll position
    const handleBeforeUnload = () => {
      window.scrollTo(0, 0);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    // Handle initial page load
    if (performance.navigation.type === 1) {
      window.scrollTo(0, 0);
    }

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  // Handle route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
} 