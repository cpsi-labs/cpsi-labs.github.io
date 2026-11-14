import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { useCopy } from '../lib/preferences';
import { ConnectSection, PageHeading } from '../components/Common';
export function About() {
  const c = useCopy();
  return (
    <>
      <div className="container page-content about-page">
        <PageHeading
          title={c(
            'Independent by choice.\nInventive by nature.',
            'Indépendant par choix.\nInventif par nature.',
          )}
          description={c(
            'CPSI LABS is an independent software development and innovation lab. A place to explore ideas, solve practical problems and build things with care.',
            'CPSI LABS est un laboratoire indépendant de développement logiciel et d’innovation. Un espace pour explorer les idées, résoudre des problèmes concrets et construire avec soin.',
          )}
        />
        <div className="about-banner">
          <img src="/brand/symbol.webp" alt="" width="180" height="129" />
          <p>
            Build.
            <br />
            Innovate.
            <br />
            <span>Evolve.</span>
          </p>
          <span className="about-banner-note">
            {c('Ideas become useful here.', 'Ici, les idées deviennent utiles.')}
          </span>
        </div>
        <section className="editorial-split">
          <h2>
            {c('Software with a reason to exist.', 'Des logiciels qui ont une raison d’être.')}
          </h2>
          <div>
            <p className="large-copy">
              {c(
                'The mission is simple: turn technical possibilities into useful experiences.',
                'La mission est simple : transformer les possibilités techniques en expériences utiles.',
              )}
            </p>
            <p>
              {c(
                'We work across mobile, desktop, web, networks, security and automation. The medium changes. The approach stays the same: understand the problem, find the right shape for the solution and keep improving it.',
                'Nous explorons le mobile, le desktop, le web, les réseaux, la sécurité et l’automatisation. Le support change. L’approche reste la même : comprendre le problème, trouver la bonne forme pour la solution et continuer à l’améliorer.',
              )}
            </p>
            <p>
              {c(
                'CPSI LABS is a new publishing identity. Our first applications are in preparation. This website will be their official home for releases, documentation and support guidance.',
                'CPSI LABS est une nouvelle identité de publication. Nos premières applications sont en préparation. Ce site sera leur point d’entrée officiel pour les versions, la documentation et l’assistance.',
              )}
            </p>
            <Link to="/applications" className="text-link">
              {c('Explore the catalogue', 'Explorer le catalogue')}
              <ArrowRight size={16} />
            </Link>
          </div>
        </section>
        <section className="values-section">
          <h2>{c('Principles that guide the work.', 'Des principes qui guident le travail.')}</h2>
          <div className="value-grid">
            {[
              [
                c('Independence', 'Indépendance'),
                c(
                  'The freedom to ask a different question, choose the right tools and build at a considered pace.',
                  'La liberté de poser une autre question, de choisir les bons outils et d’avancer avec discernement.',
                ),
              ],
              [
                c('Usefulness', 'Utilité'),
                c(
                  'Start from a real need. Make software easier to understand and simpler to use.',
                  'Partir d’un besoin réel. Rendre le logiciel plus facile à comprendre et plus simple à utiliser.',
                ),
              ],
              [
                c('Privacy', 'Confidentialité'),
                c(
                  'Consider the data a feature needs before collecting it. Explain the choices and respect the user.',
                  'Questionner les données nécessaires à une fonctionnalité avant de les collecter. Expliquer les choix et respecter l’utilisateur.',
                ),
              ],
              [
                c('Continuous evolution', 'Évolution continue'),
                c(
                  'Release thoughtfully. Listen to feedback. Let actual use guide what comes next.',
                  'Publier avec soin. Écouter les retours. Laisser les usages réels guider la suite.',
                ),
              ],
            ].map(([title, text]) => (
              <article key={title}>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>
        <section className="editorial-split">
          <h2>{c('A considered technical approach.', 'Une approche technique réfléchie.')}</h2>
          <div>
            <p>
              {c(
                'We favour clear boundaries, maintainable code and interfaces that respect the platform. Technology serves the problem; a stack is a choice, not an identity.',
                'Nous privilégions des responsabilités claires, un code maintenable et des interfaces respectueuses des plateformes. La technologie sert le problème ; une stack est un choix, pas une identité.',
              )}
            </p>
            <p>
              {c(
                'Licensing is explicit for each application. Some projects may be open source, others proprietary. Official releases will document what is available and under which conditions.',
                'La licence sera explicite pour chaque application. Certains projets pourront être open source, d’autres propriétaires. Les publications officielles préciseront ce qui est disponible et dans quelles conditions.',
              )}
            </p>
            <Link to="/legal" className="text-link">
              {c('Licensing & transparency', 'Licences et transparence')}
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </section>
      </div>
      <ConnectSection />
    </>
  );
}
