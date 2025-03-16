import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Fab from '@mui/material/Fab';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, bottom: 15 }}
          animate={{ opacity: 1, bottom: 25 }}
          exit={{ opacity: 0, bottom: 15 }}
          style={{
            position: 'fixed',
            right: 25,
            zIndex: 1000,
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Fab
            size="small"
            aria-label="scroll back to top"
            onClick={scrollToTop}
            sx={(theme) => ({
              backgroundColor: 'background.paper',
              color: 'primary.main',
              boxShadow: theme.shadows[2],
              '&:hover': {
                backgroundColor: 'background.paper',
                opacity: 0.9
              }
            })}
          >
            <KeyboardArrowUpIcon />
          </Fab>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 