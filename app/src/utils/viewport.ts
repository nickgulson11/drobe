/**
 * Fix for mobile browser viewport height issues
 * Updates CSS custom property when viewport changes
 */
export function initViewportFix() {
  // Function to set the viewport height
  const setViewportHeight = () => {
    // Get the actual viewport height
    const vh = window.innerHeight * 0.01;
    // Set CSS custom property
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };

  // Set on load
  setViewportHeight();

  // Update on resize and orientation change
  window.addEventListener('resize', setViewportHeight);
  window.addEventListener('orientationchange', setViewportHeight);

  // Update when browser controls hide/show (mobile specific)
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        setViewportHeight();
        ticking = false;
      });
      ticking = true;
    }
  });
}
