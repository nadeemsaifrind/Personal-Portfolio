"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function PageLoader() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    // Wait for fonts (self-hosted, so this resolves very fast)
    // plus a short minimum so the reveal doesn't flash on fast machines
    const minDelay = new Promise<void>((res) => setTimeout(res, 200));
    const fontsReady = document.fonts.ready;
    Promise.all([minDelay, fontsReady]).then(() => setDone(true));
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="page-loader"
          className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.p
            className="select-none font-black lowercase tracking-[-0.06em]"
            style={{ fontSize: "clamp(2.4rem, 5vw, 3.8rem)" }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            nadeem<span style={{ color: "#02AC87" }}>.</span>
          </motion.p>

          {/* Progress bar */}
          <div className="mt-5 h-0.5 w-20 overflow-hidden rounded-full bg-foreground/8">
            <motion.div
              className="h-full rounded-full bg-primary"
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
