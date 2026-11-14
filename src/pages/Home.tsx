import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Search } from 'lucide-react';
import { useCopy, usePreferences } from '../lib/preferences';
import { GITHUB } from '../lib/links';
import { applications } from '../data/applications';
import { disciplines } from '../data/disciplines';
import { Reveal } from '../components/Reveal';
import { ApplicationCard } from './Applications';

const platforms = ['Android', 'Linux', 'Windows', 'Web'] as const;
const stack = ['Kotlin', 'Flutter', 'Dart', 'Go', 'Python', 'React', 'Linux', 'Docker'];

/** Decorative miniature of the real catalogue page, shown inside the laptop. */
function CatalogueScreen() {
  const c = useCopy();
  const { language } = usePreferences();
  return (
    <div className="mini-ui" aria-hidden="true">
      <div className="mini-nav">
        <span className="mini-brand">
          <img className="on-light" src="/brand/wordmark.webp" alt="" width="640" height="41" />
          <img className="on-dark" src="/brand/wordmark-dark.webp" alt="" width="640" height="41" />
        </span>
        <span>Applications</span>
        <span>{c('Downloads', 'Téléchargements')}</span>
        <span>Documentation</span>
        <span>{c('Support', 'Assistance')}</span>
      </div>
      <div className="mini-body">
        <div className="mini-title">Applications</div>
        <div className="mini-sub">
          {c(
            'Every CPSI LABS release, in one place.',
            'Toutes les publications CPSI LABS, au même endroit.',
          )}
        </div>
        <div className="mini-search">
          <Search size={20} />
          {c('Search applications', 'Rechercher une application')}
        </div>
        <div className="mini-chips">
          <span className="on">{c('All', 'Toutes')}</span>
          {disciplines.map((d) => (
            <span key={d.id}>{language === 'en' ? d.short : d.frShort}</span>
          ))}
        </div>
        <div className="mini-empty">
          <div>
            <strong>
              {c('No application published yet.', 'Aucune application publiée pour le moment.')}
            </strong>
            <span>
              {c(
                'The first versions will appear here as soon as they are officially released.',
                'Les premières versions apparaîtront ici dès leur publication officielle.',
              )}
            </span>
          </div>
          <em>{c('Follow on GitHub ›', 'Suivre sur GitHub ›')}</em>
        </div>
      </div>
    </div>
  );
}

/** Decorative miniature of the real downloads page, shown inside the phone. */
function DownloadsScreen() {
  const c = useCopy();
  return (
    <div className="mini-phone" aria-hidden="true">
      <div className="mini-title">{c('Downloads', 'Téléchargements')}</div>
      <div className="mini-sub">
        {c('Official releases only.', 'Versions officielles uniquement.')}
      </div>
      {platforms.map((p) => (
        <div className="mini-row" key={p}>
          {p}
          <small>{c('Coming', 'À venir')}</small>
        </div>
      ))}
      <div className="mini-verify">
        {c(
          'Each file ships with its SHA-256 fingerprint.',
          'Chaque fichier est publié avec son empreinte SHA-256.',
        )}
        <code>sha256sum -c</code>
      </div>
    </div>
  );
}

function Phone({ children, className = '' }: { children?: ReactNode; className?: string }) {
  return (
    <div className={`device-phone ${className}`}>
      <span className="device-island" />
      <div className="device-screen">{children}</div>
    </div>
  );
}

export function Home() {
  const c = useCopy();
  return (
    <div className="home">
      <p className="home-ribbon">
        {c(
          'The first CPSI LABS applications are in development.',
          'Les premières applications CPSI LABS sont en cours de développement.',
        )}{' '}
        <a href={GITHUB}>
          {c('Follow releases on GitHub', 'Suivre les publications sur GitHub')} ›
        </a>
      </p>

      <section className="home-hero" aria-labelledby="home-title">
        <div className="container">
          <p className="home-eyebrow">
            <span className="home-app-icon" aria-hidden="true">
              <img className="on-light" src="/brand/symbol.webp" alt="" width="833" height="599" />
              <img
                className="on-dark"
                src="/brand/symbol-dark.webp"
                alt=""
                width="833"
                height="599"
              />
            </span>
            {c('Independent software lab', 'Laboratoire logiciel indépendant')}
          </p>
          <h1 id="home-title">
            {c(
              'Software. Mobile apps. Digital tools.',
              'Logiciels. Applications mobiles. Outils digitaux.',
            )}
          </h1>
          <p className="home-lede">
            {c(
              'Built independently for Android, Linux, Windows and the web. Released openly on GitHub.',
              'Conçus de façon indépendante pour Android, Linux, Windows et le Web. Publiés en toute transparence sur GitHub.',
            )}
          </p>
          <div className="home-actions">
            <Link to="/applications" className="button primary">
              {c('Explore the catalogue', 'Découvrir le catalogue')}
            </Link>
            <a href={GITHUB} className="button outline">
              {c('Follow on GitHub', 'Suivre sur GitHub')}
            </a>
          </div>
        </div>
        <div
          className="home-stage"
          role="img"
          aria-label={c(
            'The CPSI LABS catalogue and downloads pages on a laptop and a phone.',
            'Les pages Catalogue et Téléchargements de CPSI LABS sur un ordinateur portable et un téléphone.',
          )}
        >
          <div className="device-laptop">
            <div className="device-lid">
              <div className="device-screen">
                <CatalogueScreen />
              </div>
            </div>
            <div className="device-base" />
          </div>
          <Phone className="stage-phone">
            <DownloadsScreen />
          </Phone>
        </div>
      </section>

      <section className="home-tiles" aria-label={c('Disciplines', 'Disciplines')}>
        <article className="tile">
          <Reveal>
            <h2>{c('Mobile applications', 'Applications mobiles')}</h2>
            <p>
              {c(
                'Designed around the way people use their phones.',
                'Pensées pour la façon dont on utilise vraiment son téléphone.',
              )}
            </p>
            <div className="tile-links">
              <Link to="/about">{c('Learn more', 'En savoir plus')} ›</Link>
              <Link to="/applications?category=mobile">
                {c('Android & cross-platform', 'Android et multiplateforme')} ›
              </Link>
            </div>
          </Reveal>
          <Phone className="tile-phone">
            <div className="tile-phone-art" aria-hidden="true">
              <span>Mobile</span>
              <small>{c('Android · Cross-platform', 'Android · Multiplateforme')}</small>
            </div>
          </Phone>
        </article>
        <article className="tile tile-dark">
          <Reveal>
            <h2>{c('Desktop software', 'Logiciels desktop')}</h2>
            <p>
              {c(
                'Focused tools for Linux and Windows.',
                'Des outils ciblés pour Linux et Windows.',
              )}
            </p>
            <div className="tile-links">
              <Link to="/applications?category=desktop">
                {c('See the category', 'Voir la catégorie')} ›
              </Link>
              <Link to="/docs">
                {c('How the catalogue works', 'Comment fonctionne le catalogue')} ›
              </Link>
            </div>
          </Reveal>
          <figure className="code-window">
            <div className="code-bar" aria-hidden="true">
              <i />
              <i />
              <i />
              <span>src/data/applications.ts</span>
            </div>
            <pre>
              <code>
                <b className="k">export interface</b> <b className="t">Application</b> {'{'}
                {'\n  '}
                <b className="p">slug</b>: <b className="t">string</b>;{'\n  '}
                <b className="p">name</b>: <b className="t">string</b>;{'\n  '}
                <b className="p">summary</b>: {'{ '}
                <b className="p">en</b>: <b className="t">string</b>; <b className="p">fr</b>:{' '}
                <b className="t">string</b> {'}'};{'\n  '}
                <b className="p">platforms</b>: <b className="t">Platform</b>[];{' '}
                <b className="cm">{'// Android, Linux, Windows, Web'}</b>
                {'\n  '}
                <b className="p">releases</b>: <b className="t">Release</b>[];{'  '}
                <b className="cm">{'// GitHub + SHA-256'}</b>
                {'\n}'}
              </code>
            </pre>
            <figcaption className="sr-only">
              {c(
                'Excerpt of the catalogue data structure used by this website.',
                'Extrait de la structure de données du catalogue utilisée par ce site.',
              )}
            </figcaption>
          </figure>
        </article>
      </section>

      <section className="home-trio" aria-label={c('More disciplines', 'Autres disciplines')}>
        <article className="tile tile-image">
          <Reveal>
            <h2>{c('Web & APIs', 'Web et API')}</h2>
            <p>
              {c(
                'Clear interfaces. Well-defined APIs.',
                'Des interfaces claires. Des API bien définies.',
              )}
            </p>
            <div className="tile-links">
              <Link to="/applications?category=web">
                {c('See the category', 'Voir la catégorie')} ›
              </Link>
            </div>
          </Reveal>
        </article>
        <article className="tile">
          <Reveal>
            <h2>{c('Networks & systems', 'Réseaux et systèmes')}</h2>
            <p>
              {c(
                'Make complex environments readable.',
                'Rendre les environnements complexes lisibles.',
              )}
            </p>
            <div className="tile-links">
              <Link to="/applications?category=systems">
                {c('See the category', 'Voir la catégorie')} ›
              </Link>
            </div>
          </Reveal>
          <div className="tile-art art-systems" aria-hidden="true" />
        </article>
        <article className="tile tile-dark">
          <Reveal>
            <h2>{c('Automation', 'Automatisation')}</h2>
            <p>
              {c(
                'Less repetition. More useful work.',
                'Moins de répétitions. Plus de travail utile.',
              )}
            </p>
            <div className="tile-links">
              <Link to="/applications?category=automation">
                {c('See the category', 'Voir la catégorie')} ›
              </Link>
            </div>
          </Reveal>
          <div className="tile-art art-automation" aria-hidden="true" />
        </article>
      </section>

      <section className="home-catalogue" aria-labelledby="catalogue-title">
        <div className="container">
          <Reveal>
            <h2 id="catalogue-title">{c('The catalogue.', 'Le catalogue.')}</h2>
            <p className="home-section-lede">
              {c(
                'Every application is presented the same way: what it does, where it runs, how to verify it.',
                'Chaque application y est présentée de la même façon : ce qu’elle fait, où elle fonctionne, comment la vérifier.',
              )}
            </p>
          </Reveal>
          <nav className="home-categories" aria-label={c('Categories', 'Catégories')}>
            <Link to="/applications" className="on">
              {c('All', 'Toutes')}
            </Link>
            {disciplines.map((d) => (
              <Link key={d.id} to={`/applications?category=${d.id}`}>
                {c(d.short, d.frShort)}
              </Link>
            ))}
          </nav>
          {applications.length ? (
            <div className="application-grid">
              {applications.slice(0, 3).map((app) => (
                <ApplicationCard key={app.slug} app={app} />
              ))}
            </div>
          ) : (
            <div className="template-card">
              <div className="template-info">
                <span className="template-label">
                  {c(
                    'Template preview · no application published',
                    'Aperçu du gabarit · aucune application publiée',
                  )}
                </span>
                <div className="template-head">
                  <span className="template-slot">{c('Icon', 'Icône')}</span>
                  <div>
                    <strong>{c('Application name', 'Nom de l’application')}</strong>
                    <span>
                      {c(
                        'Its slogan, in French and English',
                        'Son slogan, en français et en anglais',
                      )}
                    </span>
                  </div>
                </div>
                <dl className="template-facts">
                  <div>
                    <dt>{c('Platforms', 'Plateformes')}</dt>
                    <dd>Android · Linux · Windows · Web</dd>
                  </div>
                  <div>
                    <dt>{c('Languages', 'Langues')}</dt>
                    <dd>Français · English</dd>
                  </div>
                  <div>
                    <dt>{c('Licence', 'Licence')}</dt>
                    <dd>{c('Always stated', 'Toujours indiquée')}</dd>
                  </div>
                  <div>
                    <dt>{c('Integrity', 'Intégrité')}</dt>
                    <dd>{c('SHA-256 per file', 'SHA-256 par fichier')}</dd>
                  </div>
                  <div>
                    <dt>Source</dt>
                    <dd>github.com/cpsi-labs</dd>
                  </div>
                  <div>
                    <dt>Documentation</dt>
                    <dd>{c('Bilingual guide', 'Guide bilingue')}</dd>
                  </div>
                </dl>
                <p className="template-status">
                  <span aria-hidden="true" />
                  {c(
                    'First releases in preparation.',
                    'Premières publications en préparation.',
                  )}{' '}
                  <a href={GITHUB}>{c('Follow on GitHub', 'Suivre sur GitHub')} ›</a>
                </p>
              </div>
              <div className="template-shots" aria-hidden="true">
                <Phone>
                  <span className="template-shot-note">
                    {c(
                      'Real screenshots only — added at release.',
                      'Captures réelles uniquement — ajoutées à la publication.',
                    )}
                  </span>
                </Phone>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="home-hood" aria-labelledby="hood-title">
        <div className="container">
          <Reveal>
            <h2 id="hood-title">{c('Under the hood.', 'Sous le capot.')}</h2>
            <p className="home-section-lede">
              {c(
                'What you don’t see, but can always check.',
                'Ce que vous ne voyez pas, mais pouvez toujours vérifier.',
              )}
            </p>
          </Reveal>
          <div className="hood-grid">
            <article>
              <h3>{c('Verifiable.', 'Vérifiable.')}</h3>
              <p>
                {c(
                  'Each release file comes with its published SHA-256 fingerprint.',
                  'Chaque fichier publié est accompagné de son empreinte SHA-256.',
                )}
              </p>
              <pre className="hood-vignette">
                <code>
                  $ sha256sum -c &lt;{c('file', 'fichier')}&gt;.sha256{'\n'}&lt;
                  {c('file', 'fichier')}&gt;: <b>OK</b>
                </code>
              </pre>
              <Link className="hood-link" to="/docs?section=verification">
                {c('How to verify', 'Comment vérifier')} ›
              </Link>
            </article>
            <article>
              <h3>{c('Bilingual.', 'Bilingue.')}</h3>
              <p>
                {c(
                  'Site, documentation and release notes, in French and English.',
                  'Site, documentation et notes de version, en français et en anglais.',
                )}
              </p>
              <div className="hood-vignette" aria-hidden="true">
                <span className="hood-segment">
                  <span className="on">Français</span>
                  <span>English</span>
                </span>
                <strong>{c('Installation guide', 'Guide d’installation')}</strong>
                <span>
                  {c(
                    'Every application documents its own steps.',
                    'Chaque application documente ses propres étapes.',
                  )}
                </span>
              </div>
              <Link className="hood-link" to="/docs">
                {c('Read the documentation', 'Lire la documentation')} ›
              </Link>
            </article>
            <article>
              <h3>{c('Discreet.', 'Discret.')}</h3>
              <p>
                {c(
                  'This site keeps only two preferences, on your device.',
                  'Ce site ne conserve que deux préférences, sur votre appareil.',
                )}
              </p>
              <dl className="hood-vignette hood-prefs">
                <div>
                  <dt>{c('Language', 'Langue')}</dt>
                  <dd>{c('English', 'Français')}</dd>
                </div>
                <div>
                  <dt>{c('Theme', 'Thème')}</dt>
                  <dd>{c('Saved locally', 'Enregistré localement')}</dd>
                </div>
                <div>
                  <dt>{c('Accounts, trackers', 'Comptes, traceurs')}</dt>
                  <dd>{c('None', 'Aucun')}</dd>
                </div>
              </dl>
              <Link className="hood-link" to="/legal">
                {c('Privacy principles', 'Principes de confidentialité')} ›
              </Link>
            </article>
          </div>
        </div>
      </section>

      <section className="home-process" aria-labelledby="process-title">
        <div className="container">
          <Reveal>
            <h2 id="process-title">
              {c('From repository to release.', 'Du dépôt à la publication.')}
            </h2>
            <p className="home-section-lede">
              {c(
                'How an application joins the catalogue.',
                'Comment une application rejoint le catalogue.',
              )}
            </p>
          </Reveal>
          <ol className="process-steps">
            <li>
              <h3>{c('Official repository', 'Dépôt officiel')}</h3>
              <p>
                {c(
                  'Source and licence under github.com/cpsi-labs.',
                  'Source et licence sous github.com/cpsi-labs.',
                )}
              </p>
            </li>
            <li>
              <h3>{c('GitHub release', 'Version GitHub')}</h3>
              <p>
                {c(
                  'Versioned, dated, with release notes.',
                  'Versionnée, datée, avec ses notes de version.',
                )}
              </p>
            </li>
            <li>
              <h3>{c('SHA-256 fingerprint', 'Empreinte SHA-256')}</h3>
              <p>
                {c(
                  'Published for every downloadable file.',
                  'Publiée pour chaque fichier téléchargeable.',
                )}
              </p>
            </li>
            <li>
              <h3>{c('Bilingual documentation', 'Documentation FR/EN')}</h3>
              <p>
                {c(
                  'Then the catalogue entry, validated at build.',
                  'Puis la fiche catalogue, validée à la compilation.',
                )}
              </p>
            </li>
          </ol>
          <p className="home-stack">
            <strong>{c('Built with', 'Construit avec')}</strong>
            {stack.map((tool) => (
              <span key={tool}>{tool}</span>
            ))}
          </p>
          <Link className="text-link" to="/about">
            {c('About the lab', 'À propos du laboratoire')}
            <ChevronRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
