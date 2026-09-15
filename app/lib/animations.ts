/**
 * Unified Animation Configuration
 * 
 * Modifying values here updates entry and page-load animations across the entire site.
 */

export const ANIMATION_CONFIG = {
  // Durations (in seconds)
  duration: {
    fast: 0.3,
    normal: 0.45, // Standard entry animation speed (previously 0.8s)
    slow: 0.6,
    globe: 0.7,
  },
  // Stagger intervals (in seconds) between sequenced items
  stagger: {
    fast: 0.05,
    normal: 0.09, // Standard stagger increment (previously 0.2s)
    slow: 0.14,
  },
  // Easings
  ease: {
    // Snappy, modern ease-out deceleration
    out: [0.21, 0.47, 0.32, 0.98] as const,
    // Ultra smooth
    smooth: [0.16, 1, 0.3, 1] as const,
  },
};

/**
 * Standard transition helper with customizable delay and speed
 */
export const transitionNormal = (delay = 0) => ({
  duration: ANIMATION_CONFIG.duration.normal,
  delay,
  ease: ANIMATION_CONFIG.ease.out,
});

export const transitionFast = (delay = 0) => ({
  duration: ANIMATION_CONFIG.duration.fast,
  delay,
  ease: ANIMATION_CONFIG.ease.out,
});

export const transitionSlow = (delay = 0) => ({
  duration: ANIMATION_CONFIG.duration.slow,
  delay,
  ease: ANIMATION_CONFIG.ease.out,
});

/**
 * Common motion animation presets
 */
export const fadeInUp = (delay = 0, y = 20) => ({
  initial: { opacity: 0, y },
  animate: { opacity: 1, y: 0 },
  transition: transitionNormal(delay),
});

export const fadeIn = (delay = 0) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: transitionNormal(delay),
});

export const scaleIn = (delay = 0, initialScale = 0.92) => ({
  initial: { opacity: 0, scale: initialScale },
  animate: { opacity: 1, scale: 1 },
  transition: transitionNormal(delay),
});

export const slideInLeft = (delay = 0, x = -30) => ({
  initial: { opacity: 0, x },
  animate: { opacity: 1, x: 0 },
  transition: transitionNormal(delay),
});

export const slideInRight = (delay = 0, x = 30) => ({
  initial: { opacity: 0, x },
  animate: { opacity: 1, x: 0 },
  transition: transitionNormal(delay),
});

/**
 * Common viewport scroll-in presets
 */
export const viewportFadeInUp = (delay = 0, y = 20) => ({
  initial: { opacity: 0, y },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: transitionNormal(delay),
});
