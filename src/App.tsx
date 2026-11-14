import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { applications } from './data/applications';
import { Layout } from './components/Layout';
import { NotFound } from './components/Common';
import { Home } from './pages/Home';
import { Applications, ApplicationDetails } from './pages/Applications';
import { Downloads } from './pages/Downloads';
import { Documentation } from './pages/Documentation';
import { About } from './pages/About';
import { Support } from './pages/Support';
import { Legal } from './pages/Legal';
import { useCopy } from './lib/preferences';
export function App() {
  const { pathname } = useLocation();
  const c = useCopy();
  useEffect(() => {
    const titles: Record<string, string> = {
      '/': 'Build. Innovate. Evolve.',
      '/applications': c('Applications', 'Applications'),
      '/downloads': c('Downloads', 'Téléchargements'),
      '/docs': c('Documentation', 'Documentation'),
      '/about': c('The lab', 'Le laboratoire'),
      '/support': 'Support',
      '/legal': c('Legal & privacy', 'Droit et confidentialité'),
    };
    const application = applications.find((app) => pathname === `/applications/${app.slug}`);
    document.title = `CPSI LABS — ${application?.name ?? titles[pathname] ?? c('Page not found', 'Page introuvable')}`;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute(
        'content',
        c(
          'CPSI LABS is an independent software development lab. Mobile, desktop, web and systems. Build. Innovate. Evolve.',
          'CPSI LABS est un laboratoire indépendant de développement logiciel. Mobile, desktop, web et systèmes. Build. Innovate. Evolve.',
        ),
      );
  }, [pathname, c]);
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/applications" element={<Applications />} />
        <Route path="/applications/:slug" element={<ApplicationDetails />} />
        <Route path="/downloads" element={<Downloads />} />
        <Route path="/docs" element={<Documentation />} />
        <Route path="/about" element={<About />} />
        <Route path="/support" element={<Support />} />
        <Route path="/legal" element={<Legal />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}
