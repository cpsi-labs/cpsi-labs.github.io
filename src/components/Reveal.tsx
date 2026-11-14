import { useEffect, useRef, type ReactNode } from 'react';
/** A finite visual entrance. Content remains visible if motion or observation is unavailable. */
export function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!element || motion.matches || !('IntersectionObserver' in window)) return;
    let animation: Animation | undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        animation = element.animate(
          [{ transform: 'translateY(30px)' }, { transform: 'translateY(0)' }],
          { duration: 700, easing: 'cubic-bezier(.16,1,.3,1)' },
        );
        observer.disconnect();
      },
      { threshold: 0.12 },
    );
    observer.observe(element);
    const stop = () => {
      if (motion.matches) {
        animation?.cancel();
        observer.disconnect();
      }
    };
    motion.addEventListener('change', stop);
    return () => {
      observer.disconnect();
      animation?.cancel();
      motion.removeEventListener('change', stop);
    };
  }, []);
  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}
