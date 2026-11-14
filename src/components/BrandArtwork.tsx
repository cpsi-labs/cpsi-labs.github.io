import { useCopy } from '../lib/preferences';
/** Original geometric brand compositions. These are not screenshots of an unpublished application. */
export function BrandArtwork({
  kind,
}: {
  kind: 'monogram' | 'platforms' | 'privacy' | 'precision';
}) {
  const c = useCopy();
  if (kind === 'monogram')
    return (
      <div
        className="monogram-stage"
        role="img"
        aria-label={c(
          'The original navy and electric-blue CPSI LABS CS monogram',
          'Le véritable monogramme CS de CPSI LABS, bleu marine et bleu électrique',
        )}
      >
        <div className="monogram-object">
          <img src="/brand/symbol.webp" width="833" height="599" alt="" fetchPriority="high" />
          <span className="monogram-shadow" />
        </div>
      </div>
    );
  if (kind === 'platforms')
    return (
      <div className="platform-sculpture" aria-hidden="true">
        <div className="platform-plane plane-back" />
        <div className="platform-plane plane-middle" />
        <div className="platform-plane plane-front">
          <span className="sculpture-line" />
          <span className="sculpture-line" />
          <span className="sculpture-line" />
        </div>
        <div className="platform-caption">
          <span>Android</span>
          <span>Linux</span>
          <span>Windows</span>
          <span>Web</span>
        </div>
      </div>
    );
  if (kind === 'privacy')
    return (
      <div className="privacy-art" aria-hidden="true">
        <svg viewBox="0 0 360 300" fill="none">
          <path d="M180 35 281 75v75c0 52-49 95-101 117-52-22-101-65-101-117V75L180 35Z" />
          <path d="M159 142v-20a21 21 0 0 1 42 0v20" />
          <rect x="147" y="142" width="66" height="57" rx="14" />
          <path d="M180 164v13" />
        </svg>
      </div>
    );
  return (
    <div className="precision-art" aria-hidden="true">
      <svg viewBox="0 0 360 300" fill="none">
        <path
          d="M105 62H70v35M255 62h35v35M70 203v35h35M255 238h35v-35"
          stroke="#8a9dbb"
          strokeWidth="1.5"
        />
        <path d="M70 150h220M180 62v176" stroke="#34435c" strokeWidth="1" />
        <rect x="119" y="99" width="122" height="102" rx="12" fill="#126dff" />
        <path d="M145 125h70v50h-70z" stroke="white" strokeWidth="1.5" />
      </svg>
    </div>
  );
}
