import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowUpRight, ChevronRight, Download, FileText } from 'lucide-react';
import { applications } from '../data/applications';
import { useCopy, usePreferences } from '../lib/preferences';
import { localAsset } from '../lib/links';
import { ExternalLink } from '../components/Layout';
import { NotFound } from '../components/Common';
import { ProductMedia } from '../components/ProductMedia';
import { Reveal } from '../components/Reveal';
export function ProductPage() {
  const { slug } = useParams();
  const app = applications.find((app) => app.slug === slug);
  const c = useCopy();
  const { language } = usePreferences();
  const [selected, setSelected] = useState(0);
  useEffect(() => setSelected(0), [slug]);
  if (!app) return <NotFound application />;
  const hero = app.screenshots[app.presentation?.heroScreenshot ?? 0];
  const downloadRoute = `/applications/${app.slug}?section=product-downloads`;
  const current = app.screenshots[selected] ?? app.screenshots[0];
  return (
    <div className={`product-page product-tone-${app.presentation?.tone ?? 'light'}`}>
      <div className="product-subnav">
        <div className="container">
          <strong>{app.name}</strong>
          <Link to={downloadRoute} className="button primary">
            {c('Download', 'Télécharger')}
          </Link>
        </div>
      </div>
      <section className="product-hero">
        <div className="app-icon">
          {localAsset(app.icon) && <img src={localAsset(app.icon)} alt="" width="80" height="80" />}
        </div>
        <h1>{app.name}</h1>
        <p className="product-slogan">{(app.slogan ?? app.summary)[language]}</p>
        <div className="showcase-actions">
          <Link to={downloadRoute} className="button primary">
            {c('Download', 'Télécharger')}
            <Download size={16} />
          </Link>
          <ExternalLink href={app.documentation} className="text-link">
            Documentation
            <ChevronRight size={17} />
          </ExternalLink>
        </div>
        {hero && <ProductMedia screenshot={hero} priority />}
      </section>
      <section className="product-introduction container">
        <Reveal>
          <h2>{c('Made for the way you work.', 'Pensé pour vos usages.')}</h2>
          <p>{app.description[language]}</p>
        </Reveal>
      </section>
      {app.features.map((feature, index) => {
        const shot =
          feature.screenshotIndex !== undefined
            ? app.screenshots[feature.screenshotIndex]
            : undefined;
        return (
          <section
            key={index}
            className={`product-benefit ${index % 2 ? 'reverse tone-soft' : ''} ${shot ? '' : 'text-only'}`}
          >
            <Reveal>
              <div className="container">
                <div className="benefit-copy">
                  <h2>{feature.title[language]}</h2>
                  <p>{feature.description[language]}</p>
                </div>
                {shot && <ProductMedia screenshot={shot} />}
              </div>
            </Reveal>
          </section>
        );
      })}
      {current && (
        <section className="app-gallery" aria-label={c('Screenshots', 'Captures d’écran')}>
          <div className="container">
            <h2 className="gallery-heading">
              {c('Take a closer look.', 'Regardez de plus près.')}
            </h2>
            <ProductMedia screenshot={current} className="gallery-media" />
            <div className="screenshot-choices">
              {app.screenshots.map((shot, index) => (
                <button
                  key={shot.src}
                  aria-pressed={selected === index}
                  aria-label={shot.alt[language]}
                  onClick={() => setSelected(index)}
                >
                  {localAsset(shot.src) && (
                    <img src={localAsset(shot.src)} alt="" width="85" height="60" loading="lazy" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}
      <section className="product-technical container">
        <h2>{c('The details, considered.', 'Les détails, avec soin.')}</h2>
        <dl className="specification-list">
          <div>
            <dt>{c('Compatible platforms', 'Plateformes compatibles')}</dt>
            <dd>
              {app.platforms
                .map((platform) =>
                  platform === 'Cross-platform' ? c('Cross-platform', 'Multiplateforme') : platform,
                )
                .join(' · ')}
            </dd>
          </div>
          <div>
            <dt>{c('Latest version', 'Dernière version')}</dt>
            <dd>{app.releases[0]?.version}</dd>
          </div>
          <div>
            <dt>{c('License', 'Licence')}</dt>
            <dd>{app.license.name[language]}</dd>
          </div>
          {app.specifications?.map((spec, index) => (
            <div key={index}>
              <dt>{spec.label[language]}</dt>
              <dd>{spec.value[language]}</dd>
            </div>
          ))}
        </dl>
      </section>
      <section className="detail-section container" id="product-downloads" tabIndex={-1}>
        <h2>{c('Versions & downloads', 'Versions et téléchargements')}</h2>
        {app.releases.map((release) => (
          <article className="release" key={release.version}>
            <div>
              <h3>{release.version}</h3>
              <time dateTime={release.date}>
                {new Date(release.date + 'T12:00:00').toLocaleDateString(language, {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            </div>
            <p>{release.notes[language]}</p>
            <div className="release-assets">
              {release.assets.map((asset) => (
                <div key={asset.url}>
                  <ExternalLink href={asset.url} className="button secondary">
                    <Download size={16} />
                    {asset.label}
                  </ExternalLink>
                  {asset.sha256 && (
                    <p className="checksum">
                      SHA-256: <code>{asset.sha256}</code>
                    </p>
                  )}
                </div>
              ))}
            </div>
            <ExternalLink href={release.url} className="text-link">
              {c('Release notes on GitHub', 'Notes de version sur GitHub')}
              <ArrowUpRight size={16} />
            </ExternalLink>
          </article>
        ))}
      </section>
      <div className="container">
        <div className="resource-links">
          <ExternalLink href={app.documentation}>
            <FileText size={20} />
            <span>Documentation</span>
            <ArrowUpRight size={17} />
          </ExternalLink>
          <ExternalLink href={app.license.url}>
            <FileText size={20} />
            <span>
              {c('License', 'Licence')} · {app.license.name[language]}
            </span>
            <ArrowUpRight size={17} />
          </ExternalLink>
          <ExternalLink href={app.repository}>
            <span>{c('Official repository', 'Dépôt officiel')}</span>
            <ArrowUpRight size={17} />
          </ExternalLink>
          {app.support?.issues && (
            <ExternalLink href={app.support.issues}>
              <span>{c('Report a bug', 'Signaler un bug')}</span>
              <ArrowUpRight size={17} />
            </ExternalLink>
          )}
          {app.support?.discussions && (
            <ExternalLink href={app.support.discussions}>
              <span>{c('Join the discussion', 'Participer à la discussion')}</span>
              <ArrowUpRight size={17} />
            </ExternalLink>
          )}
        </div>
      </div>
    </div>
  );
}
