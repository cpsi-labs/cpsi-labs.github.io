import { useEffect, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Download,
  FileText,
  Search,
  SlidersHorizontal,
  X,
} from 'lucide-react';
import { applications, categories, type Application } from '../data/applications';
import { disciplines } from '../data/disciplines';
import { useCopy, usePreferences } from '../lib/preferences';
import { localAsset } from '../lib/links';
import { ExternalLink } from '../components/Layout';
import { EmptyCatalogue, NotFound, PageHeading } from '../components/Common';
export function ApplicationCard({ app }: { app: Application }) {
  const { language } = usePreferences();
  const c = useCopy();
  return (
    <article className="application-card">
      <div className="app-icon">
        {localAsset(app.icon) && <img src={localAsset(app.icon)} alt="" width="52" height="52" />}
      </div>
      <div className="tags">
        {app.platforms.map((p) => (
          <span key={p}>{p === 'Cross-platform' ? c('Cross-platform', 'Multiplateforme') : p}</span>
        ))}
      </div>
      <h3>
        <Link to={`/applications/${app.slug}`}>
          {app.name}
          <ArrowUpRight size={18} />
        </Link>
      </h3>
      <p>{app.summary[language]}</p>
      <span className="app-version">
        {app.releases[0]?.version} · {app.license.name[language]}
      </span>
      <Link className="text-link" to={`/applications/${app.slug}`}>
        {c('Discover application', 'Découvrir l’application')}
        <ArrowRight size={16} />
      </Link>
    </article>
  );
}
export function Applications() {
  const c = useCopy();
  const { language } = usePreferences();
  const [params, setParams] = useSearchParams();
  const query = params.get('q') ?? '';
  const category = params.get('category') ?? 'all';
  const platform = params.get('platform') ?? 'all';
  function filter(key: string, value: string) {
    setParams(
      (previous) => {
        const next = new URLSearchParams(previous);
        if (value && value !== 'all') next.set(key, value);
        else next.delete(key);
        return next;
      },
      { replace: true },
    );
  }
  const filtered = applications.filter(
    (app) =>
      (category === 'all' || app.categories.some((value) => value === category)) &&
      (platform === 'all' || app.platforms.some((value) => value === platform)) &&
      `${app.name} ${app.summary[language]}`
        .toLocaleLowerCase(language)
        .includes(query.trim().toLocaleLowerCase(language)),
  );
  const hasFilters = !!query || category !== 'all' || platform !== 'all';
  return (
    <div className="container page-content">
      <PageHeading
        title={c('Purpose, in every application.', 'Une intention dans chaque application.')}
        description={c(
          'Explore software by CPSI LABS. Thoughtful tools for your devices, your systems and your everyday work.',
          'Explorez les logiciels de CPSI LABS. Des outils réfléchis pour vos appareils, vos systèmes et votre quotidien.',
        )}
      />
      <div className="catalogue-toolbar">
        <label className="search-input">
          <Search size={19} />
          <span className="sr-only">{c('Search applications', 'Rechercher des applications')}</span>
          <input
            type="search"
            value={query}
            onChange={(event) => filter('q', event.target.value)}
            placeholder={c('Search applications…', 'Rechercher une application…')}
          />
          {query && (
            <button
              aria-label={c('Clear search', 'Effacer la recherche')}
              onClick={() => filter('q', '')}
            >
              <X size={16} />
            </button>
          )}
        </label>
        <label className="platform-filter">
          <SlidersHorizontal size={17} />
          <span className="sr-only">{c('Filter by platform', 'Filtrer par plateforme')}</span>
          <select value={platform} onChange={(event) => filter('platform', event.target.value)}>
            <option value="all">{c('All platforms', 'Toutes les plateformes')}</option>
            {['Android', 'Linux', 'Windows', 'Web', 'Cross-platform'].map((p) => (
              <option key={p} value={p}>
                {p === 'Cross-platform' ? c('Cross-platform', 'Multiplateforme') : p}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div
        className="category-filters"
        role="group"
        aria-label={c('Application categories', 'Catégories d’applications')}
      >
        <button aria-pressed={category === 'all'} onClick={() => filter('category', 'all')}>
          {c('All applications', 'Toutes les applications')}
        </button>
        {categories.map((id) => {
          const d = disciplines.find((d) => d.id === id)!;
          return (
            <button key={id} aria-pressed={category === id} onClick={() => filter('category', id)}>
              {language === 'en'
                ? d.short
                : {
                    mobile: 'Mobile',
                    desktop: 'Desktop',
                    web: 'Web et API',
                    systems: 'Systèmes',
                    security: 'Sécurité',
                    automation: 'Automatisation',
                  }[id]}
            </button>
          );
        })}
      </div>
      <div className="catalogue-count" aria-live="polite">
        {filtered.length}{' '}
        {c(
          filtered.length === 1 ? 'application' : 'applications',
          filtered.length === 1 ? 'application' : 'applications',
        )}
        {hasFilters && (
          <button onClick={() => setParams({})}>{c('Reset filters', 'Réinitialiser')}</button>
        )}
      </div>
      {filtered.length ? (
        <div className="application-grid">
          {filtered.map((app) => (
            <ApplicationCard key={app.slug} app={app} />
          ))}
        </div>
      ) : (
        <EmptyCatalogue filtered={hasFilters} reset={() => setParams({})} />
      )}
      <div className="resource-strip">
        <FileText size={23} />
        <div>
          <h3>{c('A question before you install?', 'Une question avant l’installation ?')}</h3>
          <p>
            {c(
              'Find installation guidance, licensing information and answers in our documentation.',
              'Retrouvez les guides d’installation, les informations de licence et les réponses dans notre documentation.',
            )}
          </p>
        </div>
        <Link className="text-link" to="/docs">
          Documentation
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
export function ApplicationDetails() {
  const { slug } = useParams();
  const app = applications.find((app) => app.slug === slug);
  const c = useCopy();
  const { language } = usePreferences();
  const [selected, setSelected] = useState(0);
  useEffect(() => setSelected(0), [slug]);
  if (!app) return <NotFound application />;
  return (
    <div className="container page-content">
      <Link className="text-link back-link" to="/applications">
        <ArrowLeft size={16} />
        {c('All applications', 'Toutes les applications')}
      </Link>
      <div className="application-heading">
        <div className="app-icon large">
          {localAsset(app.icon) && <img src={localAsset(app.icon)} alt="" width="80" height="80" />}
        </div>
        <PageHeading title={app.name} description={app.summary[language]} />
      </div>
      <div className="tags">
        {app.platforms.map((p) => (
          <span key={p}>{p === 'Cross-platform' ? c('Cross-platform', 'Multiplateforme') : p}</span>
        ))}
        <span>{app.license.name[language]}</span>
      </div>
      <p className="app-description">{app.description[language]}</p>
      {app.screenshots.length > 0 && (
        <section className="app-gallery" aria-label={c('Screenshots', 'Captures d’écran')}>
          {localAsset(app.screenshots[selected]?.src) && (
            <img
              className="main-screenshot"
              src={localAsset(app.screenshots[selected].src)}
              alt={app.screenshots[selected].alt[language]}
            />
          )}
          <div>
            {app.screenshots.map((shot, i) => (
              <button
                key={shot.src}
                aria-pressed={selected === i}
                onClick={() => setSelected(i)}
                aria-label={shot.alt[language]}
              >
                {localAsset(shot.src) && <img src={localAsset(shot.src)} alt="" />}
              </button>
            ))}
          </div>
        </section>
      )}
      <section className="detail-section">
        <h2>{c('Built for the way you work.', 'Pensé pour vos usages.')}</h2>
        <div className="feature-list">
          {app.features.map((feature, i) => (
            <article key={i}>
              <h3>{feature.title[language]}</h3>
              <p>{feature.description[language]}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="detail-section">
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
              <ArrowUpRight size={15} />
            </ExternalLink>
          </article>
        ))}
      </section>
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
  );
}
