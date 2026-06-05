'use client';

import { useEffect, useState } from 'react';

import { ArrowUp } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href="#top"
          aria-label="Back to top"
          initial={{ opacity: 0, scale: 0.6, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 12 }}
          transition={{ duration: 0.2 }}
          whileHover={{ y: -2 }}
          className="bg-brand text-brand-foreground fixed right-5 bottom-5 z-40 grid size-11 place-items-center rounded-full shadow-lg shadow-black/20 transition-colors md:right-8 md:bottom-8"
        >
          <ArrowUp className="size-5" />
        </motion.a>
      )}
    </AnimatePresence>
  );
}
