import { GithubIcon } from '../components/GithubIcon';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, MoveUpRight, ShieldCheck } from 'lucide-react';
import { useCopy, usePreferences } from '../lib/preferences';
import { disciplines } from '../data/disciplines';
import { applications } from '../data/applications';
import { ConnectSection, EmptyCatalogue } from '../components/Common';
import { ApplicationCard } from './Applications';
import { GITHUB } from '../lib/links';
export function Home() {
  const c = useCopy();
  const { language } = usePreferences();
  const [selected, setSelected] = useState(0);
  const active = disciplines[selected];
  const Icon = active.icon;
  return (
    <>
      <section className="hero container">
        <div className="hero-copy">
          <h1>
            <span>Build.</span>
            <span>Innovate.</span>
            <span className="accent">Evolve.</span>
          </h1>
          <p className="hero-description">
            {c('Independent thinking.', 'Penser librement.')}
            <br />
            <strong>{c('Purposeful software.', 'Développer avec sens.')}</strong>
          </p>
          <p className="hero-detail">
            {c(
              'We’re CPSI LABS. An independent software lab turning ideas into useful digital experiences.',
              'Nous sommes CPSI LABS. Un laboratoire logiciel indépendant qui transforme les idées en expériences numériques utiles.',
            )}
          </p>
          <div className="hero-actions">
            <Link to="/applications" className="button primary">
              {c('Explore applications', 'Explorer les applications')}
              <ArrowRight size={17} />
            </Link>
            <a href={GITHUB} className="hero-github">
              <GithubIcon size={18} />
              <span>GitHub</span>
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
        <div
          className="hero-art"
          role="img"
          aria-label={c(
            'The original CPSI LABS CS symbol at the centre of connected orbits',
            'Le véritable symbole CS de CPSI LABS au centre d’orbites reliées',
          )}
        >
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="orbit orbit-three" />
          <div className="art-axis axis-x" />
          <div className="art-axis axis-y" />
          <span className="orbit-node node-one" />
          <span className="orbit-node node-two" />
          <span className="orbit-node node-three" />
          <div className="symbol-disc">
            <img src="/brand/symbol.webp" alt="" width="400" height="288" fetchPriority="high" />
          </div>
          <div className="art-coordinate coordinate-one">
            <span />
            {c('Ideas into interfaces', 'Des idées aux interfaces')}
          </div>
          <div className="art-coordinate coordinate-two">
            <span />
            {c('Designed to connect', 'Conçu pour relier')}
          </div>
          <div className="art-caption">
            CPSI LABS <span> / </span>
            {c('Independent by design', 'Indépendant par choix')}
          </div>
        </div>
      </section>
      <div className="platform-band">
        <div className="container">
          <span>{c('Built beyond boundaries.', 'Au-delà des plateformes.')}</span>
          <div>
            <span>Android</span>
            <i />
            <span>Linux</span>
            <i />
            <span>Windows</span>
            <i />
            <span>Web</span>
            <i />
            <span>API</span>
          </div>
        </div>
      </div>
      <section className="expertise-section container">
        <div className="section-intro">
          <h2>
            {c('Different platforms.', 'Plusieurs plateformes.')}
            <br />
            <span className="muted">{c('One way of thinking.', 'Une même exigence.')}</span>
          </h2>
          <p>
            {c(
              'From the device in your hand to the systems behind it. We explore software wherever there’s a useful problem to solve.',
              'De l’appareil dans votre main aux systèmes qui le font fonctionner. Nous explorons le logiciel là où un problème mérite une solution.',
            )}
          </p>
        </div>
        <div className="expertise-layout">
          <div
            className="discipline-list"
            role="tablist"
            aria-label={c('Our expertise', 'Nos expertises')}
            aria-orientation="vertical"
          >
            {disciplines.map((d, i) => (
              <button
                key={d.id}
                role="tab"
                id={`tab-${d.id}`}
                aria-controls="discipline-panel"
                aria-selected={selected === i}
                tabIndex={selected === i ? 0 : -1}
                onClick={() => setSelected(i)}
                onKeyDown={(event) => {
                  let next = i;
                  if (event.key === 'ArrowDown') next = (i + 1) % disciplines.length;
                  else if (event.key === 'ArrowUp')
                    next = (i - 1 + disciplines.length) % disciplines.length;
                  else if (event.key === 'Home') next = 0;
                  else if (event.key === 'End') next = disciplines.length - 1;
                  else return;
                  event.preventDefault();
                  setSelected(next);
                  document.getElementById(`tab-${disciplines[next].id}`)?.focus();
                }}
              >
                <d.icon size={20} strokeWidth={1.6} />
                <span>{language === 'en' ? d.en : d.fr}</span>
                <MoveUpRight size={16} />
              </button>
            ))}
          </div>
          <div
            className="discipline-panel"
            role="tabpanel"
            id="discipline-panel"
            aria-labelledby={`tab-${active.id}`}
            tabIndex={0}
          >
            <div className={`discipline-art art-${active.id}`} aria-hidden="true">
              <div className="diagram-orbit" />
              <div className="diagram-orbit second" />
              <span className="diagram-core">
                <Icon size={51} strokeWidth={1.2} />
              </span>
              <span className="diagram-end end-a" />
              <span className="diagram-end end-b" />
              <span className="diagram-end end-c" />
              <span className="diagram-end end-d" />
            </div>
            <div className="discipline-copy" key={active.id}>
              <h3>{language === 'en' ? active.en : active.fr}</h3>
              <p>{language === 'en' ? active.enText : active.frText}</p>
              <div className="tags">
                {(language === 'en' ? active.tags : active.frTags).map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="featured-section">
        <div className="container">
          <div className="section-intro">
            <div>
              <h2>{c('Made here. Coming soon.', 'Imaginé ici. Bientôt disponible.')}</h2>
              <p>
                {c(
                  'Our applications, all in one place. Official releases, clear documentation and a direct line to the source.',
                  'Toutes nos applications au même endroit. Versions officielles, documentation claire et accès direct aux sources de publication.',
                )}
              </p>
            </div>
            <Link className="text-link" to="/applications">
              {c('View the catalogue', 'Voir le catalogue')}
              <ArrowRight size={16} />
            </Link>
          </div>
          {applications.length ? (
            <div className="application-grid">
              {applications.slice(0, 3).map((app) => (
                <ApplicationCard key={app.slug} app={app} />
              ))}
            </div>
          ) : (
            <EmptyCatalogue />
          )}
        </div>
      </section>
      <section className="approach-section container">
        <div className="approach-statement">
          <h2>
            {c('Small details.', 'Le sens du détail.')}
            <br />
            {c('Lasting purpose.', 'L’envie de durer.')}
          </h2>
          <Link to="/about" className="text-link">
            {c('Get to know the lab', 'Découvrir le laboratoire')}
            <ArrowRight size={16} />
          </Link>
        </div>
        <div className="principles">
          <article>
            <span className="principle-marker" />
            <div>
              <h3>{c('Useful from the start', 'Utile dès le départ')}</h3>
              <p>
                {c(
                  'Start with a real problem. Build only what helps. Refine what matters.',
                  'Partir d’un problème réel. Construire ce qui aide. Affiner ce qui compte.',
                )}
              </p>
            </div>
          </article>
          <article>
            <span className="principle-marker" />
            <div>
              <h3>{c('Care in every layer', 'Du soin à chaque niveau')}</h3>
              <p>
                {c(
                  'Clear interfaces, considered architecture and an attention to the details you feel.',
                  'Des interfaces claires, une architecture réfléchie et ces détails qui font la différence.',
                )}
              </p>
            </div>
          </article>
          <article>
            <ShieldCheck size={21} />
            <div>
              <h3>{c('Privacy is a principle', 'La confidentialité comme principe')}</h3>
              <p>
                {c(
                  'Respect for your data starts with the choices we make before the first line of code.',
                  'Le respect des données commence par les choix qui précèdent la première ligne de code.',
                )}
              </p>
            </div>
          </article>
        </div>
      </section>
      <ConnectSection />
    </>
  );
}
