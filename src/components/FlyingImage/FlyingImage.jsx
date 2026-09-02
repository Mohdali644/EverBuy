// components/FlyingImage/FlyingImage.jsx
import { useEffect, useState } from 'react';
import { useCart } from '../../context/CartContext';
import styles from './FlyingImage.module.css'; // Use CSS module for targeted animation

export default function FlyingImage({ id, src, startRect, targetRect }) {
  const { removeFlyingImage } = useCart();
  
  // 1. Component State to manage styles, allowing CSS transitions to trigger
  const [style, setStyle] = useState({
    top: `${startRect.top}px`,
    left: `${startRect.left}px`,
    width: `${startRect.width}px`,
    height: `${startRect.height}px`,
    opacity: '1',
    borderRadius: '12px',
    position: 'fixed',
    zIndex: '999999',
    pointerEvents: 'none',
  });

  // 2. Lifecycle Logic: Start animation on mount[cite: 1]
  useEffect(() => {
    // Slight delay so the DOM registers initial position before animating
    const timer = setTimeout(() => {
      // Apply replicated visual transform: position, shrink, fade, and round
      setStyle((prev) => ({
        ...prev,
        // PARABOLA TRICK: Cubic Bézier applies acceleration[cite: 1]
        top: `${targetRect.top + (targetRect.height / 2) - 25}px`,
        left: `${targetRect.left + (targetRect.width / 2) - 25}px`,
        width: '50px',
        height: '50px',
        opacity: '0.4',
        borderRadius: '50%',
        // Import exact transitions from style.css
        transition: `
          left 0.8s linear, 
          top 0.8s cubic-bezier(0.5, -0.5, 0.75, 1), 
          width 0.8s ease-in, 
          height 0.8s ease-in, 
          opacity 0.8s ease-in,
          border-radius 0.8s ease-in
        `,
      }));
    }, 10); // Slight frame offset

    return () => clearTimeout(timer);
  }, [targetRect.top, targetRect.left, targetRect.width, targetRect.height]);

  // 3. Cleanup Logic: Remove from global state after animation finishes[cite: 1]
  const handleTransitionEnd = (e) => {
    if (e.propertyName === 'left') { // Pick one stable transition property
      removeFlyingImage(id);
    }
  };

  return (
    <div
      style={style}
      className={styles.flyingImage}
      onTransitionEnd={handleTransitionEnd}
    >
      <img src={src} alt="Cart Animation Clone" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
    </div>
  );
}