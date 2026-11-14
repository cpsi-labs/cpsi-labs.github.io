import { ProductMedia } from '../components/ProductMedia';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, FileText, Search, SlidersHorizontal, X } from 'lucide-react';
import { applications, categories, type Application } from '../data/applications';
import { disciplines } from '../data/disciplines';
import { useCopy, usePreferences } from '../lib/preferences';
import { localAsset } from '../lib/links';
import { EmptyCatalogue, PageHeading } from '../components/Common';
export function ApplicationCard({ app }: { app: Application }) {
  const { language } = usePreferences();
  const c = useCopy();
  return (
    <article className="application-card">
      <div className="app-icon">
        {localAsset(app.icon) && <img src={localAsset(app.icon)} alt="" width="64" height="64" />}
      </div>
      <h3>
        <Link to={`/applications/${app.slug}`}>{app.name}</Link>
      </h3>
      <p>{(app.slogan ?? app.summary)[language]}</p>
      {app.screenshots[0] && (
        <ProductMedia screenshot={app.screenshots[0]} className="catalogue-preview" />
      )}
      <Link className="text-link" to={`/applications/${app.slug}`}>
        {c('Discover application', 'Découvrir l’application')}
        <ArrowRight size={16} />
      </Link>
      <div className="tags">
        {app.platforms.map((platform) => (
          <span key={platform}>
            {platform === 'Cross-platform' ? c('Cross-platform', 'Multiplateforme') : platform}
          </span>
        ))}
      </div>
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
              {language === 'en' ? d.short : d.frShort}
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
export { ProductPage as ApplicationDetails } from './ProductPage';
