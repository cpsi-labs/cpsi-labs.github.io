import { usePreferences } from '../lib/preferences';
import { localAsset } from '../lib/links';
import type { Application } from '../data/applications';

type ProductMediaProps = {
  screenshot: Application['screenshots'][number];
  className?: string;
  priority?: boolean;
};

export function ProductMedia({ screenshot, className = '', priority = false }: ProductMediaProps) {
  const { language } = usePreferences();
  const src = localAsset(screenshot.src);
  if (!src) return null;

  const frame = screenshot.frame ?? 'none';
  const framedChrome = frame === 'browser' || frame === 'desktop';

  return (
    <div className={`product-media frame-${frame}${className ? ` ${className}` : ''}`}>
      {frame === 'phone' && <span className="phone-speaker" aria-hidden="true" />}
      <div className="product-screen">
        {framedChrome && <span className="product-frame-bar" aria-hidden="true" />}
        <img
          src={src}
          alt={screenshot.alt[language]}
          width={screenshot.width}
          height={screenshot.height}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
        />
      </div>
    </div>
  );
}
