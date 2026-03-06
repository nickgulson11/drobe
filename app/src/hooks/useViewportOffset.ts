import { useState, useEffect } from 'react';

/**
 * Hook to detect mobile browser chrome height and return safe bottom offset
 * Handles dynamic browser toolbars that appear/disappear on scroll
 */
export function useViewportOffset() {
  const [bottomOffset, setBottomOffset] = useState(0);

  useEffect(() => {
    const calculateOffset = () => {
      // Only apply offset on mobile devices (width < 768px)
      if (window.innerWidth >= 768) {
        setBottomOffset(0);
        return;
      }

      // On mobile, we need to account for browser chrome at the bottom
      // Use innerHeight as the reference point
      // When browser UI is visible, we want a larger offset
      // When browser UI is hidden (scrolled away), we want less offset

      // Check if visualViewport API is available
      if (window.visualViewport) {
        const viewportHeight = window.visualViewport.height;
        const windowHeight = window.innerHeight;
        const screenHeight = window.screen.height;

        // When viewport is smaller than window, browser chrome is taking up space
        const chromeSpace = windowHeight - viewportHeight;

        // Debug logging
        console.log('Mobile viewport debug:', {
          viewportHeight,
          windowHeight,
          screenHeight,
          chromeSpace,
          userAgent: navigator.userAgent.includes('Safari') ? 'Safari' : 'Chrome',
        });

        // We want the nav to sit just above where the content area ends
        // Use a base offset + any chrome space detected
        if (chromeSpace > 5) {
          // Browser chrome is visible - add extra offset
          const offset = Math.max(chromeSpace, 20);
          console.log('Setting offset:', offset);
          setBottomOffset(offset);
        } else {
          // Browser chrome is hidden or minimal
          console.log('Setting offset: 10');
          setBottomOffset(10);
        }
      } else {
        // Fallback for browsers without visualViewport API
        // Use a safe default that works for most mobile browsers
        console.log('No visualViewport API, using fallback: 60');
        setBottomOffset(60);
      }
    };

    // Calculate on mount
    calculateOffset();

    // Recalculate on resize and scroll
    window.addEventListener('resize', calculateOffset);
    window.addEventListener('scroll', calculateOffset);
    window.visualViewport?.addEventListener('resize', calculateOffset);
    window.visualViewport?.addEventListener('scroll', calculateOffset);

    return () => {
      window.removeEventListener('resize', calculateOffset);
      window.removeEventListener('scroll', calculateOffset);
      window.visualViewport?.removeEventListener('resize', calculateOffset);
      window.visualViewport?.removeEventListener('scroll', calculateOffset);
    };
  }, []);

  return bottomOffset;
}
