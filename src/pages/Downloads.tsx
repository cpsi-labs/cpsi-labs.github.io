import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Download, ShieldCheck, Terminal } from 'lucide-react';
import { applications } from '../data/applications';
import { useCopy, usePreferences } from '../lib/preferences';
import { ExternalLink } from '../components/Layout';
import { PageHeading } from '../components/Common';
export function Downloads() {
  const c = useCopy();
  const { language } = usePreferences();
  const [platform, setPlatform] = useState('all');
  const releases = applications
    .flatMap((app) =>
      app.releases
        .slice(0, 1)
        .flatMap((release) => release.assets.map((asset) => ({ app, release, asset }))),
    )
    .filter(({ asset }) => platform === 'all' || asset.platform === platform);
  return (
    <div className="container page-content">
      <PageHeading
        title={c('The official starting point.', 'Votre point de départ officiel.')}
        description={c(
          'Get CPSI LABS software from its source. Choose your platform, check the release notes and download with context.',
          'Téléchargez les logiciels CPSI LABS depuis leur source. Choisissez votre plateforme et consultez les notes de version avant de commencer.',
        )}
      >
        <span className="heading-icon">
          <Download size={31} strokeWidth={1.3} />
        </span>
      </PageHeading>
      <div className="downloads-layout">
        <aside className="download-sidebar">
          <h2>{c('Your platform', 'Votre plateforme')}</h2>
          <div role="group" aria-label={c('Download platform', 'Plateforme de téléchargement')}>
            {['all', 'Android', 'Linux', 'Windows', 'Web', 'Cross-platform'].map((p) => (
              <button key={p} aria-pressed={platform === p} onClick={() => setPlatform(p)}>
                {p === 'all'
                  ? c('All platforms', 'Toutes les plateformes')
                  : p === 'Cross-platform'
                    ? c('Cross-platform', 'Multiplateforme')
                    : p}
                <ArrowRight size={15} />
              </button>
            ))}
          </div>
          <div className="sidebar-note">
            <ShieldCheck size={21} />
            <p>
              {c(
                'Official files are hosted on the project’s GitHub Releases page.',
                'Les fichiers officiels sont hébergés sur la page GitHub Releases du projet.',
              )}
            </p>
          </div>
        </aside>
        <div className="download-results" aria-live="polite">
          {releases.length ? (
            releases.map(({ app, release, asset }) => (
              <article className="download-row" key={asset.url}>
                <div>
                  <Link to={`/applications/${app.slug}`}>
                    <h3>{app.name}</h3>
                  </Link>
                  <p>
                    {release.version} · {asset.platform} · {app.license.name[language]}
                  </p>
                  {asset.sha256 && <code className="checksum">SHA-256: {asset.sha256}</code>}
                </div>
                <ExternalLink href={asset.url} className="button primary">
                  <Download size={16} />
                  {asset.label}
                </ExternalLink>
                <ExternalLink href={release.url} className="text-link">
                  {c('Release notes', 'Notes de version')}
                  <ArrowUpRight size={15} />
                </ExternalLink>
              </article>
            ))
          ) : (
            <div className="download-empty">
              <div className="download-outline" aria-hidden="true">
                <Download size={42} strokeWidth={1} />
              </div>
              <h2>{c('A little more building.', 'Encore un peu de construction.')}</h2>
              <p>
                {c(
                  'No downloads are available' +
                    (platform === 'all' ? ' yet.' : ' for this platform yet.') +
                    ' Official files will appear here as our applications are released.',
                  'Aucun téléchargement n’est encore disponible' +
                    (platform === 'all' ? '.' : ' pour cette plateforme.') +
                    ' Les fichiers officiels apparaîtront ici lors de la publication de nos applications.',
                )}
              </p>
              <Link to="/applications" className="text-link">
                {c('Explore the catalogue', 'Explorer le catalogue')}
                <ArrowRight size={16} />
              </Link>
            </div>
          )}
        </div>
      </div>
      <section className="download-guidance">
        <div>
          <ShieldCheck size={26} />
          <h2>{c('Verify before you run.', 'Vérifiez avant d’exécuter.')}</h2>
          <p>
            {c(
              'When a release includes SHA-256 checksums, compare the downloaded file with the published value. If a signature is provided, follow the project’s verification instructions and confirm the public key fingerprint through a trusted channel.',
              'Lorsqu’une version fournit des empreintes SHA-256, comparez le fichier téléchargé à la valeur publiée. Si une signature est disponible, suivez les instructions du projet et confirmez l’empreinte de la clé publique par un canal fiable.',
            )}
          </p>
          <Link to="/docs?section=verification" className="text-link">
            {c('Read the verification guide', 'Lire le guide de vérification')}
            <ArrowRight size={16} />
          </Link>
        </div>
        <div className="command-panel">
          <span>
            <Terminal size={16} />
            {c('Linux · checksum verification', 'Linux · vérification d’empreinte')}
          </span>
          <pre>
            <code>sha256sum -c SHA256SUMS</code>
          </pre>
          <p>
            {c(
              'Run in the folder containing the downloaded files and the official SHA256SUMS file. A checksum detects a mismatch; it does not authenticate the publisher by itself.',
              'À exécuter dans le dossier contenant les fichiers téléchargés et le fichier SHA256SUMS officiel. Une empreinte détecte une différence ; elle n’authentifie pas, à elle seule, l’éditeur.',
            )}
          </p>
        </div>
      </section>
    </div>
  );
}
