import { GithubIcon } from '../components/GithubIcon';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, BookOpen, Bug, MessageSquare, ShieldCheck } from 'lucide-react';
import { useCopy } from '../lib/preferences';
import { GITHUB } from '../lib/links';
import { PageHeading } from '../components/Common';
export function Support() {
  const c = useCopy();
  return (
    <div className="container page-content">
      <PageHeading
        title={c('Let’s find the right next step.', 'Trouvons la bonne prochaine étape.')}
        description={c(
          'Questions, bug reports or a useful idea. Here’s how to find guidance and reach CPSI LABS through its official channels.',
          'Une question, un bug ou une idée utile. Voici comment trouver de l’aide et joindre CPSI LABS par ses canaux officiels.',
        )}
      />
      <div className="support-lead">
        <div>
          <BookOpen size={29} strokeWidth={1.4} />
          <h2>{c('Start with the documentation.', 'Commencez par la documentation.')}</h2>
          <p>
            {c(
              'Installation essentials, updates, file verification and common questions. The answer may already be there.',
              'Installation, mises à jour, vérification des fichiers et questions fréquentes. La réponse s’y trouve peut-être déjà.',
            )}
          </p>
          <Link className="button secondary" to="/docs">
            {c('Open documentation', 'Ouvrir la documentation')}
            <ArrowRight size={16} />
          </Link>
        </div>
        <div className="support-channel">
          <GithubIcon size={37} strokeWidth={1.2} />
          <h2>{c('One official place.', 'Un point de contact officiel.')}</h2>
          <p>
            {c(
              'GitHub is our public communication channel. No public email or contact form is available.',
              'GitHub est notre canal de communication public. Aucune adresse e-mail publique ni aucun formulaire de contact n’est disponible.',
            )}
          </p>
          <a className="text-link" href={GITHUB}>
            github.com/cpsi-labs
            <ArrowUpRight size={17} />
          </a>
        </div>
      </div>
      <section className="support-paths">
        <article>
          <Bug size={24} />
          <div>
            <h2>{c('Report a bug', 'Signaler un bug')}</h2>
            <p>
              {c(
                'Use Issues in the application’s repository when enabled. Include the application version, operating system, steps to reproduce and expected behaviour. Check existing issues first.',
                'Utilisez les Issues du dépôt de l’application lorsqu’elles sont activées. Indiquez la version, le système, les étapes de reproduction et le comportement attendu. Consultez d’abord les signalements existants.',
              )}
            </p>
          </div>
          <span className="availability-label">
            {c('Per project, when available', 'Par projet, selon disponibilité')}
          </span>
        </article>
        <article>
          <MessageSquare size={24} />
          <div>
            <h2>{c('Share an idea', 'Partager une idée')}</h2>
            <p>
              {c(
                'Use the project’s Discussions when configured, or its documented feedback channel. Describe the problem you would like to solve and how a change would help.',
                'Utilisez les Discussions du projet lorsqu’elles seront configurées, ou le canal de retour documenté. Décrivez le problème à résoudre et l’utilité du changement proposé.',
              )}
            </p>
          </div>
          <span className="availability-label">
            {c('Channels being prepared', 'Canaux en préparation')}
          </span>
        </article>
        <article>
          <ShieldCheck size={24} />
          <div>
            <h2>{c('Report a security concern', 'Signaler un problème de sécurité')}</h2>
            <p>
              {c(
                'Consult the project’s SECURITY.md or private reporting channel when enabled. Do not disclose vulnerabilities, personal information or credentials in public. No dedicated private channel is currently announced.',
                'Consultez le fichier SECURITY.md du projet ou son canal privé lorsqu’il est activé. Ne divulguez pas de vulnérabilité, d’information personnelle ou d’identifiant en public. Aucun canal privé dédié n’est actuellement annoncé.',
              )}
            </p>
            <Link className="text-link" to="/legal?section=security">
              {c('Read the security policy', 'Lire la politique de sécurité')}
              <ArrowRight size={16} />
            </Link>
          </div>
        </article>
      </section>
      <div className="notice">
        <ShieldCheck size={22} />
        <p>
          {c(
            'Before sharing logs or screenshots, remove passwords, tokens, personal file paths and any private information. Support availability and response times are not guaranteed.',
            'Avant de partager des journaux ou des captures, retirez les mots de passe, jetons, chemins personnels et toute information privée. La disponibilité de l’assistance et les délais de réponse ne sont pas garantis.',
          )}
        </p>
      </div>
    </div>
  );
}
