import { GITHUB } from '../lib/links';
import { Link } from 'react-router-dom';
import { Boxes, ChevronRight } from 'lucide-react';
import { useCopy } from '../lib/preferences';
import { applications } from '../data/applications';
import { BrandArtwork } from '../components/BrandArtwork';
import { Reveal } from '../components/Reveal';
import { ConnectSection } from '../components/Common';
import { ApplicationCard } from './Applications';
export function Home() {
  const c = useCopy();
  return (
    <div className="showcase-home">
      <section className="brand-showcase" aria-labelledby="brand-title">
        <div className="showcase-copy">
          <h1 id="brand-title">CPSI LABS</h1>
          <p className="brand-tagline">Build. Innovate. Evolve.</p>
          <p className="brand-vision">
            {c(
              'Independent ideas. Software with purpose.',
              'Des idées libres. Des logiciels qui ont du sens.',
            )}
          </p>
          <div className="showcase-actions">
            <Link to="/applications" className="button primary">
              {c('Discover our applications', 'Découvrir nos applications')}
            </Link>
            <Link to="/about" className="button outline">
              {c('Learn more', 'En savoir plus')}
            </Link>
          </div>
        </div>
        <BrandArtwork kind="monogram" />
      </section>
      <section className="software-showcase section-navy">
        <Reveal>
          <div className="showcase-copy">
            <h2>{c('A world of possibilities.', 'Un monde de possibilités.')}</h2>
            <p className="showcase-subtitle">
              {c('Across platforms. Around you.', 'Plusieurs plateformes. Vous au centre.')}
            </p>
            <p>
              {c(
                'Mobile, desktop and web. Different ways to make the everyday feel simpler.',
                'Mobile, desktop et web. Autant de façons de simplifier le quotidien.',
              )}
            </p>
            <Link to="/about" className="text-link">
              {c('Explore our approach', 'Découvrir notre approche')}
              <ChevronRight size={18} />
            </Link>
          </div>
          <BrandArtwork kind="platforms" />
        </Reveal>
      </section>
      <div className="showcase-pair">
        <section className="value-showcase privacy-showcase">
          <Reveal>
            <div className="showcase-copy">
              <h2>{c('Privacy.\nBy intention.', 'La confidentialité.\nPar choix.')}</h2>
              <p>
                {c(
                  'Good software starts with respect.\nFor your choices. And your data.',
                  'Un bon logiciel commence par le respect.\nDe vos choix. Et de vos données.',
                )}
              </p>
              <Link to="/legal" className="text-link">
                {c('Our privacy principles', 'Nos principes de confidentialité')}
                <ChevronRight size={17} />
              </Link>
            </div>
            <BrandArtwork kind="privacy" />
          </Reveal>
        </section>
        <section className="value-showcase precision-showcase">
          <Reveal>
            <div className="showcase-copy">
              <h2>
                {c(
                  'Less friction.\nMore possibility.',
                  'Moins de friction.\nPlus de possibilités.',
                )}
              </h2>
              <p>
                {c(
                  'Clarity in the interface. Care in the code.\nPerformance as a design goal.',
                  'La clarté dans l’interface. Le soin dans le code.\nLa performance comme objectif.',
                )}
              </p>
              <Link to="/about" className="text-link">
                {c('How we build', 'Notre façon de concevoir')}
                <ChevronRight size={17} />
              </Link>
            </div>
            <BrandArtwork kind="precision" />
          </Reveal>
        </section>
      </div>
      <section className="catalogue-showcase">
        <div className="container">
          <div className="showcase-copy">
            <h2>{c('The next chapter\nis taking shape.', 'La suite\nprend forme.')}</h2>
            <p>
              {c(
                'Our first applications are in preparation.\nA considered beginning. Room to evolve.',
                'Nos premières applications sont en préparation.\nDes débuts réfléchis. Et l’envie d’évoluer.',
              )}
            </p>
            <Link to="/applications" className="text-link">
              {c('Explore the catalogue', 'Explorer le catalogue')}
              <ChevronRight size={18} />
            </Link>
          </div>
          {applications.length ? (
            <div className="application-grid">
              {applications.slice(0, 2).map((app) => (
                <ApplicationCard key={app.slug} app={app} />
              ))}
            </div>
          ) : (
            <div className="catalogue-coming-soon">
              <Boxes size={36} strokeWidth={1.25} aria-hidden="true" />
              <a className="text-link" href={GITHUB}>
                {c(
                  'Follow the first releases on GitHub',
                  'Suivre les premières publications sur GitHub',
                )}
                <ChevronRight size={17} />
              </a>
            </div>
          )}
        </div>
      </section>
      <section className="possibilities-showcase section-black">
        <Reveal>
          <div className="container possibilities-layout">
            <div>
              <h2>{c('Beyond the interface.', 'Au-delà de l’interface.')}</h2>
              <p>
                {c(
                  'The details you notice.\nThe foundations you don’t.',
                  'Les détails que vous voyez.\nLes fondations qui vous échappent.',
                )}
              </p>
            </div>
            <div className="possibility-list">
              <article>
                <h3>{c('Networks & systems', 'Réseaux et systèmes')}</h3>
                <p>
                  {c(
                    'Understand what connects. Make complex environments more approachable.',
                    'Comprendre ce qui relie. Rendre les environnements complexes plus accessibles.',
                  )}
                </p>
              </article>
              <article>
                <h3>{c('Web & APIs', 'Web et API')}</h3>
                <p>
                  {c(
                    'Clear experiences, connected through thoughtful architecture.',
                    'Des expériences claires, reliées par une architecture réfléchie.',
                  )}
                </p>
              </article>
              <article>
                <h3>{c('Automation', 'Automatisation')}</h3>
                <p>
                  {c(
                    'Less repetition. More space for the work that matters.',
                    'Moins de répétitions. Plus de place pour le travail qui compte.',
                  )}
                </p>
              </article>
            </div>
          </div>
        </Reveal>
      </section>
      <ConnectSection />
    </div>
  );
}
