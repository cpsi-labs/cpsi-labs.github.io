import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Check,
  Copy,
  Download,
  FileCheck2,
  LifeBuoy,
  RefreshCw,
  ShieldCheck,
} from 'lucide-react';
import { useState } from 'react';
import { useCopy } from '../lib/preferences';
import { GITHUB } from '../lib/links';
import { PageHeading } from '../components/Common';
export function Documentation() {
  const c = useCopy();
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (!copied) return;
    const id = setTimeout(() => setCopied(false), 2200);
    return () => clearTimeout(id);
  }, [copied]);
  const [copyError, setCopyError] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText('sha256sum -c SHA256SUMS');
      setCopied(true);
      setCopyError(false);
    } catch {
      setCopyError(true);
    }
  }
  const sections = [
    { id: 'getting-started', text: c('Getting started', 'Premiers pas'), icon: BookOpen },
    { id: 'installation', text: c('Installation', 'Installation'), icon: Download },
    { id: 'updates', text: c('Updates', 'Mises à jour'), icon: RefreshCw },
    { id: 'verification', text: c('File verification', 'Vérifier un fichier'), icon: FileCheck2 },
    { id: 'troubleshooting', text: c('Troubleshooting', 'Dépannage'), icon: LifeBuoy },
    { id: 'faq', text: c('FAQ', 'Questions fréquentes'), icon: BookOpen },
  ];
  function jump(id: string) {
    document.getElementById(id)?.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'instant'
        : 'smooth',
    });
    document.getElementById(id)?.focus({ preventScroll: true });
  }
  return (
    <div className="container page-content">
      <PageHeading
        title={c('A little clarity goes a long way.', 'Bien comprendre pour mieux avancer.')}
        description={c(
          'Installation, updates and the essentials. A practical guide to getting the most out of CPSI LABS software.',
          'Installation, mises à jour et informations essentielles. Des repères pratiques pour utiliser les logiciels CPSI LABS.',
        )}
      />
      <div className="docs-layout">
        <aside className="docs-sidebar">
          <span>{c('On this page', 'Sur cette page')}</span>
          <nav aria-label={c('Documentation sections', 'Rubriques de documentation')}>
            {sections.map((section) => (
              <button key={section.id} onClick={() => jump(section.id)}>
                <section.icon size={16} />
                {section.text}
              </button>
            ))}
          </nav>
          <Link to="/support" className="text-link">
            {c('Need a hand?', 'Besoin d’aide ?')}
            <ArrowRight size={15} />
          </Link>
        </aside>
        <article className="documentation-content">
          <section id="getting-started" tabIndex={-1}>
            <h2>{c('Start with the right source.', 'Commencez par la bonne source.')}</h2>
            <p>
              {c(
                'This is the general documentation hub for CPSI LABS. Application-specific requirements, detailed instructions and release notes live in each project’s official repository.',
                'Cet espace réunit la documentation générale de CPSI LABS. Les prérequis, instructions détaillées et notes de version propres à chaque application se trouvent dans son dépôt officiel.',
              )}
            </p>
            <div className="notice">
              <BookOpen size={20} />
              <p>
                {c(
                  'Our first applications are in preparation. These guides describe how future official releases will be distributed. Product-specific documentation will appear with each publication.',
                  'Nos premières applications sont en préparation. Ces guides expliquent comment les futures versions officielles seront distribuées. La documentation spécifique accompagnera chaque publication.',
                )}
              </p>
            </div>
          </section>
          <section id="installation" tabIndex={-1}>
            <h2>{c('Install with confidence.', 'Installer en toute connaissance.')}</h2>
            <ol className="step-list">
              <li>
                <h3>
                  {c(
                    'Choose your application and platform',
                    'Choisissez l’application et la plateforme',
                  )}
                </h3>
                <p>
                  {c(
                    'Open the application page or Downloads. Check the supported operating system, architecture and prerequisites in its documentation.',
                    'Ouvrez la fiche de l’application ou les téléchargements. Vérifiez le système, l’architecture et les prérequis dans sa documentation.',
                  )}
                </p>
              </li>
              <li>
                <h3>
                  {c(
                    'Read the release notes and license',
                    'Consultez les notes de version et la licence',
                  )}
                </h3>
                <p>
                  {c(
                    'Review known limitations, installation changes and the rights granted by the application’s license.',
                    'Consultez les limites connues, les changements d’installation et les droits accordés par la licence de l’application.',
                  )}
                </p>
              </li>
              <li>
                <h3>{c('Download the official file', 'Téléchargez le fichier officiel')}</h3>
                <p>
                  {c(
                    'Use the project’s GitHub Releases page. Verify the file when checksums or signatures are provided, then follow the project’s installation guide. Never bypass a system security warning without understanding its cause.',
                    'Utilisez la page GitHub Releases du projet. Vérifiez le fichier si des empreintes ou signatures sont fournies, puis suivez le guide du projet. Ne contournez jamais un avertissement de sécurité sans en comprendre la cause.',
                  )}
                </p>
              </li>
            </ol>
            <Link to="/downloads" className="text-link">
              {c('Go to Downloads', 'Ouvrir les téléchargements')}
              <ArrowRight size={16} />
            </Link>
          </section>
          <section id="updates" tabIndex={-1}>
            <h2>
              {c('Keep the context with the update.', 'Mettre à jour avec les bons repères.')}
            </h2>
            <p>
              {c(
                'Check the official release history for your application. Back up important data before updating and follow any migration instructions. Update mechanisms vary by application; do not assume automatic updates are available.',
                'Consultez l’historique officiel de votre application. Sauvegardez les données importantes avant une mise à jour et suivez les éventuelles instructions de migration. Les mécanismes varient selon les applications ; les mises à jour automatiques ne sont pas garanties.',
              )}
            </p>
          </section>
          <section id="verification" tabIndex={-1}>
            <h2>{c('Check the file you received.', 'Vérifiez le fichier reçu.')}</h2>
            <p>
              {c(
                'When SHA256SUMS is included in a release, download it from the same official release page and compare your file’s hash with the published value. On Linux, run:',
                'Lorsqu’un fichier SHA256SUMS accompagne une version, téléchargez-le depuis la même page officielle et comparez l’empreinte de votre fichier à la valeur publiée. Sous Linux :',
              )}
            </p>
            <div className="code-block">
              <code>sha256sum -c SHA256SUMS</code>
              <button
                className="icon-button"
                onClick={copy}
                aria-label={c('Copy verification command', 'Copier la commande de vérification')}
              >
                {copied ? <Check size={17} /> : <Copy size={17} />}
              </button>
            </div>
            <p role="status" className="copy-status">
              {copied
                ? c('Command copied.', 'Commande copiée.')
                : copyError
                  ? c(
                      'Copy unavailable. Select the command above to copy it manually.',
                      'Copie indisponible. Sélectionnez la commande ci-dessus pour la copier manuellement.',
                    )
                  : ''}
            </p>
            <p>{c('On Windows, use PowerShell:', 'Sous Windows, utilisez PowerShell :')}</p>
            <pre>
              <code>
                Get-FileHash .\{c('downloaded-file', 'fichier-telecharge')} -Algorithm SHA256
              </code>
            </pre>
            <p>
              {c(
                'Replace the filename with the actual downloaded file, then compare the displayed hash. A matching checksum confirms file consistency against that value; it is not a digital signature. If a signature is provided, verify it with the official public key and independently confirm its fingerprint.',
                'Remplacez le nom par celui du fichier téléchargé, puis comparez l’empreinte affichée. Une empreinte identique confirme la cohérence du fichier par rapport à cette valeur ; ce n’est pas une signature numérique. Si une signature est fournie, vérifiez-la avec la clé publique officielle et confirmez son empreinte de manière indépendante.',
              )}
            </p>
          </section>
          <section id="troubleshooting" tabIndex={-1}>
            <h2>
              {c('When something doesn’t go to plan.', 'Quand tout ne se passe pas comme prévu.')}
            </h2>
            <p>
              {c(
                'Check the application’s system requirements and known issues first. Note your operating system, the application version and the steps that reproduce the problem. Remove tokens, personal paths and private information from logs and screenshots before sharing them.',
                'Vérifiez d’abord les prérequis et les problèmes connus de l’application. Notez votre système, la version et les étapes qui reproduisent le problème. Retirez les jetons, chemins personnels et données privées des journaux et captures avant de les partager.',
              )}
            </p>
            <Link to="/support" className="text-link">
              {c('Find the right support channel', 'Trouver le bon canal d’assistance')}
              <ArrowRight size={16} />
            </Link>
          </section>
          <section id="faq" tabIndex={-1}>
            <h2>{c('A few things worth knowing.', 'Quelques réponses utiles.')}</h2>
            <div className="faq-list">
              {[
                [
                  c('Are the applications free?', 'Les applications sont-elles gratuites ?'),
                  c(
                    'Pricing and usage rights will be stated for each application. Free of charge does not necessarily mean open source. Always read the license.',
                    'Le prix et les droits d’utilisation seront indiqués pour chaque application. Gratuit ne signifie pas nécessairement open source. Consultez toujours la licence.',
                  ),
                ],
                [
                  c('Where can I find source code?', 'Où trouver le code source ?'),
                  c(
                    'For an open-source application, consult its official repository and LICENSE file. Proprietary software may be distributed without public source code.',
                    'Pour une application open source, consultez le dépôt officiel et son fichier LICENSE. Un logiciel propriétaire peut être distribué sans code source public.',
                  ),
                ],
                [
                  c(
                    'Is every application available on every platform?',
                    'Toutes les applications existent-elles sur chaque plateforme ?',
                  ),
                  c(
                    'No. Supported platforms and prerequisites will be listed on each application page. Download only the file that matches your system.',
                    'Non. Les plateformes et prérequis seront indiqués sur chaque fiche. Téléchargez uniquement le fichier adapté à votre système.',
                  ),
                ],
                [
                  c(
                    'How do I report a security issue?',
                    'Comment signaler un problème de sécurité ?',
                  ),
                  c(
                    'Follow the repository’s SECURITY.md file or its private vulnerability reporting channel when enabled. Never publish exploit details, credentials or personal data in a public issue.',
                    'Suivez le fichier SECURITY.md du dépôt ou son canal privé de signalement lorsqu’il est activé. Ne publiez jamais de détails exploitables, d’identifiants ou de données personnelles dans une issue publique.',
                  ),
                ],
              ].map(([question, answer]) => (
                <details key={question}>
                  <summary>{question}</summary>
                  <p>{answer}</p>
                </details>
              ))}
            </div>
            <a href={GITHUB} className="text-link">
              {c('Visit the official GitHub', 'Consulter le GitHub officiel')}
              <ArrowUpRight size={16} />
            </a>
          </section>
          <div className="notice">
            <ShieldCheck size={21} />
            <p>
              {c(
                'The documentation shipped with each application takes precedence over this general guide.',
                'La documentation fournie avec chaque application prévaut sur ce guide général.',
              )}
            </p>
          </div>
        </article>
      </div>
    </div>
  );
}
