import { ArrowUpRight } from 'lucide-react';
import { useCopy } from '../lib/preferences';
import { PageHeading } from '../components/Common';
export function Legal() {
  const c = useCopy();
  return (
    <div className="container page-content">
      <PageHeading
        title={c(
          'Clarity is part of the experience.',
          'La transparence fait partie de l’expérience.',
        )}
        description={c(
          'Privacy, terms of use, licenses and security. The essentials for using this website and understanding our publications.',
          'Confidentialité, conditions d’utilisation, licences et sécurité. L’essentiel pour utiliser ce site et comprendre nos publications.',
        )}
      />
      <div className="legal-layout">
        <aside>
          <span>
            {c('Last updated: November 14, 2026', 'Dernière mise à jour : 14 novembre 2026')}
          </span>
          <p>{c('Publisher: CPSI LABS', 'Éditeur : CPSI LABS')}</p>
          <p>
            {c(
              'Independent software publishing identity. Official public channel: GitHub.',
              'Identité indépendante de publication de logiciels. Canal public officiel : GitHub.',
            )}
          </p>
          <a className="text-link" href="https://github.com/cpsi-labs">
            GitHub
            <ArrowUpRight size={15} />
          </a>
        </aside>
        <article className="documentation-content">
          <section id="privacy">
            <h2>{c('Privacy', 'Confidentialité')}</h2>
            <p>
              {c(
                'This website has no user accounts, payment system, contact form or application analytics. It does not embed advertising or third-party tracking scripts. Fonts, icons and brand assets are served with the website.',
                'Ce site ne propose ni compte utilisateur, ni paiement, ni formulaire de contact, ni mesure d’audience applicative. Il n’intègre aucune publicité ni script de suivi tiers. Les polices, icônes et visuels de marque sont servis avec le site.',
              )}
            </p>
            <p>
              {c(
                'Your language and theme preferences are stored locally in your browser under cpsi-language and cpsi-theme. These settings are not sent to a CPSI LABS server. Clear your browser’s site data to remove them. If local storage is blocked, the website still works for the current session.',
                'Vos préférences de langue et de thème sont conservées localement dans votre navigateur sous cpsi-language et cpsi-theme. Elles ne sont pas envoyées à un serveur CPSI LABS. Effacez les données du site dans votre navigateur pour les supprimer. Si le stockage local est bloqué, le site reste utilisable pendant la session.',
              )}
            </p>
            <p>
              {c(
                'The website is hosted on GitHub Pages. GitHub may process technical connection data, including IP addresses, as part of hosting and operating its service. Visiting GitHub links takes you to a separate service governed by its own policies.',
                'Le site est hébergé sur GitHub Pages. GitHub peut traiter des données techniques de connexion, dont les adresses IP, dans le cadre de l’hébergement et du fonctionnement de son service. Les liens GitHub conduisent à un service distinct soumis à ses propres politiques.',
              )}
            </p>
            <a
              href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement"
              className="text-link"
            >
              {c('GitHub privacy statement', 'Déclaration de confidentialité de GitHub')}
              <ArrowUpRight size={15} />
            </a>
            <p>
              {c(
                'Each application may have its own privacy policy. This website’s practices do not describe the data handling of future applications.',
                'Chaque application pourra disposer de sa propre politique de confidentialité. Les pratiques de ce site ne décrivent pas le traitement des données des futures applications.',
              )}
            </p>
          </section>
          <section id="terms">
            <h2>{c('Terms of use', 'Conditions d’utilisation')}</h2>
            <p>
              {c(
                'This website introduces CPSI LABS and provides information about its software publications. Content may evolve as projects are released. Application availability, supported platforms and requirements are specified in the relevant project documentation.',
                'Ce site présente CPSI LABS et ses publications logicielles. Son contenu peut évoluer au fil des publications. La disponibilité, les plateformes et les prérequis des applications sont précisés dans la documentation du projet concerné.',
              )}
            </p>
            <p>
              {c(
                'Check the license and release documentation before installing or using an application. No support response time or uninterrupted website availability is promised. The website does not grant additional rights to software beyond its stated license.',
                'Consultez la licence et la documentation de version avant d’installer ou d’utiliser une application. Aucun délai de réponse de l’assistance ni disponibilité ininterrompue du site n’est promis. Le site n’accorde aucun droit supplémentaire sur les logiciels au-delà de leur licence.',
              )}
            </p>
          </section>
          <section id="licenses">
            <h2>{c('Licenses & intellectual property', 'Licences et propriété intellectuelle')}</h2>
            <h3>{c('Website and brand', 'Site et marque')}</h3>
            <p>
              {c(
                'The CPSI LABS name, logos and original website content are reserved to their rights holders. Publishing a repository publicly does not, by itself, grant a license to reuse its contents.',
                'Le nom CPSI LABS, les logos et les contenus originaux du site sont réservés à leurs titulaires de droits. La publication d’un dépôt public n’accorde pas, à elle seule, une licence de réutilisation de son contenu.',
              )}
            </p>
            <h3>{c('Open-source applications', 'Applications open source')}</h3>
            <p>
              {c(
                'The LICENSE file in each repository defines the rights to use, modify and redistribute that project. Open-source licenses vary; consult the applicable file.',
                'Le fichier LICENSE de chaque dépôt définit les droits d’utilisation, de modification et de redistribution du projet. Les licences open source varient ; consultez le fichier applicable.',
              )}
            </p>
            <h3>{c('Proprietary applications', 'Applications propriétaires')}</h3>
            <p>
              {c(
                'A proprietary application may be distributed without public source code. Its own terms define the permissions granted. Free of charge and open source are different concepts.',
                'Une application propriétaire peut être distribuée sans code source public. Ses conditions propres définissent les droits accordés. La gratuité et l’open source sont des notions distinctes.',
              )}
            </p>
            <h3>{c('Third-party software', 'Composants tiers')}</h3>
            <p>
              {c(
                'This website uses React (MIT), React Router (MIT), Vite (MIT), Tailwind CSS (MIT), Lucide icons (ISC) and the Manrope typeface (SIL Open Font License 1.1). These components retain their respective licenses and attributions.',
                'Ce site utilise React (MIT), React Router (MIT), Vite (MIT), Tailwind CSS (MIT), les icônes Lucide (ISC) et la police Manrope (SIL Open Font License 1.1). Ces composants conservent leurs licences et attributions respectives.',
              )}
            </p>
            <a href="/third-party-notices.txt" className="text-link">
              {c('Third-party license notices', 'Notices de licences tierces')}
              <ArrowUpRight size={15} />
            </a>
          </section>
          <section id="security" tabIndex={-1}>
            <h2>{c('Security policy', 'Politique de sécurité')}</h2>
            <p>
              {c(
                'Use only files linked from the official project’s GitHub Releases page. Checksums, digital signatures and verification steps will be listed when provided for a release. Their availability is not guaranteed for every project.',
                'Utilisez uniquement les fichiers liés depuis la page GitHub Releases officielle du projet. Les empreintes, signatures et procédures de vérification seront indiquées lorsqu’elles sont fournies. Leur présence n’est pas garantie pour chaque projet.',
              )}
            </p>
            <p>
              {c(
                'To report a vulnerability, follow the affected repository’s SECURITY.md file or private vulnerability reporting channel when enabled. Do not post exploit details or sensitive data publicly. No dedicated private security reporting channel is currently announced; consult the official repository for updates before sharing technical details.',
                'Pour signaler une vulnérabilité, suivez le fichier SECURITY.md du dépôt concerné ou son canal privé de signalement lorsqu’il est activé. Ne publiez pas de détails exploitables ni de données sensibles. Aucun canal privé dédié n’est actuellement annoncé ; consultez le dépôt officiel pour connaître les évolutions avant de partager des détails techniques.',
              )}
            </p>
          </section>
        </article>
      </div>
    </div>
  );
}
