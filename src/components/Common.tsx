import { ArrowRight, ArrowUpRight, Boxes, SearchX } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';
import { useCopy } from '../lib/preferences';
import { GITHUB } from '../lib/links';
export function PageHeading({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <div className="page-heading">
      <div>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      {children}
    </div>
  );
}
export function EmptyCatalogue({
  filtered = false,
  reset,
}: {
  filtered?: boolean;
  reset?: () => void;
}) {
  const c = useCopy();
  return (
    <div className="empty-catalogue">
      <div className="empty-visual" aria-hidden="true">
        <div />
        <span>
          {filtered ? (
            <SearchX size={34} strokeWidth={1.3} />
          ) : (
            <Boxes size={34} strokeWidth={1.3} />
          )}
        </span>
        <div />
      </div>
      <h2>
        {filtered
          ? c('Nothing here. Yet.', 'Aucun résultat pour le moment.')
          : c('Good software takes intention.', 'Les bons logiciels prennent forme.')}
      </h2>
      <p>
        {filtered
          ? c(
              'Try another search or clear your filters to explore all applications.',
              'Essayez une autre recherche ou effacez vos filtres pour explorer les applications.',
            )
          : c(
              'Our first applications are in preparation. When they’re ready, you’ll find them here — with everything you need to get started.',
              'Nos premières applications sont en préparation. Retrouvez-les ici dès leur publication, avec tout le nécessaire pour démarrer.',
            )}
      </p>
      {filtered ? (
        <button onClick={reset} className="button secondary">
          {c('Clear filters', 'Effacer les filtres')}
        </button>
      ) : (
        <a href={GITHUB} className="text-link">
          {c('Follow the lab on GitHub', 'Suivre le laboratoire sur GitHub')}{' '}
          <ArrowUpRight size={16} />
        </a>
      )}
    </div>
  );
}
export function ConnectSection() {
  const c = useCopy();
  return (
    <section className="connect-section container">
      <div>
        <h2>{c('Keep an eye on what’s next.', 'La suite se construit ici.')}</h2>
        <p>
          {c(
            'New ideas. Thoughtful tools. Follow the work as it takes shape.',
            'De nouvelles idées, des outils réfléchis. Suivez le travail au fil de son évolution.',
          )}
        </p>
      </div>
      <a className="button primary" href={GITHUB}>
        <span>{c('Find us on GitHub', 'Retrouvez-nous sur GitHub')}</span>
        <ArrowUpRight size={17} />
      </a>
    </section>
  );
}
export function NotFound({ application = false }: { application?: boolean }) {
  const c = useCopy();
  return (
    <div className="container not-found">
      <span className="error-code">404</span>
      <h1>
        {application
          ? c('Application not found.', 'Application introuvable.')
          : c('A path still unexplored.', 'Un chemin encore inexploré.')}
      </h1>
      <p>
        {application
          ? c(
              'This application is not in our published catalogue. Browse the catalogue for official releases.',
              'Cette application ne figure pas dans notre catalogue publié. Consultez le catalogue pour les versions officielles.',
            )
          : c(
              'This page doesn’t exist. Let’s get you back to the lab.',
              'Cette page n’existe pas. Revenons au laboratoire.',
            )}
      </p>
      <Link className="button primary" to={application ? '/applications' : '/'}>
        {application
          ? c('Browse applications', 'Voir les applications')
          : c('Back to home', 'Retour à l’accueil')}
        <ArrowRight size={17} />
      </Link>
    </div>
  );
}
