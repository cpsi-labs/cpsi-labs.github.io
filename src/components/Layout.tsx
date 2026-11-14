import { GithubIcon } from './GithubIcon';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ArrowUpRight, Menu, Moon, Search, Sun, X } from 'lucide-react';
import { useCopy, usePreferences } from '../lib/preferences';
import { GITHUB, officialLink } from '../lib/links';
export function ExternalLink({
  href,
  children,
  className = '',
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  const safe = officialLink(href);
  return safe ? (
    <a href={safe} className={className}>
      {children}
    </a>
  ) : null;
}
export function Brand({ footer = false }: { footer?: boolean }) {
  return (
    <Link to="/" aria-label="CPSI LABS" className={`brand ${footer ? 'brand-footer' : ''}`}>
      {!footer && (
        <span className="brand-symbol" aria-hidden="true">
          <img className="on-light" src="/brand/symbol.webp" alt="" width="833" height="599" />
          <img className="on-dark" src="/brand/symbol-dark.webp" alt="" width="833" height="599" />
        </span>
      )}
      <span className="brand-wordmark" aria-hidden="true">
        <img className="on-light" src="/brand/wordmark.webp" alt="" width="640" height="41" />
        <img className="on-dark" src="/brand/wordmark-dark.webp" alt="" width="640" height="41" />
      </span>
    </Link>
  );
}
export function Layout({ children }: { children: ReactNode }) {
  const c = useCopy();
  const { language, setLanguage, theme, toggleTheme } = usePreferences();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const menuButton = useRef<HTMLButtonElement>(null);
  const previousPath = useRef<string | null>(null);
  useEffect(() => {
    const changedPage = previousPath.current !== location.pathname;
    previousPath.current = location.pathname;
    const section = new URLSearchParams(location.search).get('section');
    const target = section ? document.getElementById(section) : null;
    let cancelled = false;
    if (changedPage) setOpen(false);
    if (target) {
      // One owner for route scrolling: wait for fonts before measuring the section.
      void document.fonts.ready.then(() => {
        if (cancelled) return;
        target.scrollIntoView({ behavior: 'instant', block: 'start' });
        target.focus({ preventScroll: true });
      });
    } else if (changedPage) {
      window.scrollTo({ top: 0, behavior: 'instant' });
      document.getElementById('main')?.focus({ preventScroll: true });
    }
    return () => {
      cancelled = true;
    };
  }, [location.pathname, location.search]);
  useEffect(() => {
    function close(event: KeyboardEvent) {
      if (event.key === 'Escape' && open) {
        setOpen(false);
        menuButton.current?.focus();
      }
    }
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [open]);
  return (
    <>
      <a
        className="skip-link"
        href="#main"
        onClick={(event) => {
          event.preventDefault();
          document.getElementById('main')?.focus();
        }}
      >
        {c('Skip to content', 'Aller au contenu')}
      </a>
      <header className="site-header">
        <div className="container header-inner">
          <Brand />
          <nav
            className={`main-nav ${open ? 'is-open' : ''}`}
            id="navigation"
            aria-label={c('Main navigation', 'Navigation principale')}
          >
            <NavLink to="/applications" end>
              {c('Applications', 'Applications')}
            </NavLink>
            <Link className="nav-category" to="/applications?category=mobile">
              Mobile
            </Link>
            <Link className="nav-category" to="/applications?category=desktop">
              Desktop
            </Link>
            <Link className="nav-category" to="/applications?category=web">
              {c('Web & API', 'Web et API')}
            </Link>
            <NavLink to="/downloads">{c('Downloads', 'Téléchargements')}</NavLink>
            <NavLink to="/docs">{c('Documentation', 'Documentation')}</NavLink>
            <NavLink to="/about">{c('About', 'À propos')}</NavLink>
            <NavLink to="/support">{c('Support', 'Assistance')}</NavLink>
          </nav>
          <div className="header-tools">
            <Link
              to="/applications"
              className="icon-button search-control"
              aria-label={c('Search applications', 'Rechercher une application')}
            >
              <Search size={16} />
            </Link>
            <button
              className="language-control"
              onClick={() => setLanguage(language === 'en' ? 'fr' : 'en')}
              aria-label={language === 'en' ? 'Passer en français' : 'Switch to English'}
            >
              <span className={language === 'en' ? 'on' : ''}>EN</span>
              <span className={language === 'fr' ? 'on' : ''}>FR</span>
            </button>
            <button
              className="icon-button theme-control"
              onClick={toggleTheme}
              aria-label={
                theme === 'dark'
                  ? c('Switch to light theme', 'Activer le thème clair')
                  : c('Switch to dark theme', 'Activer le thème sombre')
              }
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <a
              href={GITHUB}
              className="header-github"
              aria-label={c('CPSI LABS on GitHub', 'CPSI LABS sur GitHub')}
            >
              <GithubIcon size={18} />
            </a>
            <button
              ref={menuButton}
              className="icon-button menu-toggle"
              aria-expanded={open}
              aria-controls="navigation"
              onClick={() => setOpen(!open)}
              aria-label={
                open ? c('Close menu', 'Fermer le menu') : c('Open menu', 'Ouvrir le menu')
              }
            >
              {open ? <X size={21} /> : <Menu size={21} />}
            </button>
          </div>
        </div>
      </header>
      <main id="main" tabIndex={-1}>
        {children}
      </main>
      <footer className="site-footer">
        <div className="container">
          <div className="footer-links">
            <div>
              <span>Applications</span>
              <Link to="/applications">{c('All applications', 'Toutes les applications')}</Link>
              <Link className="nav-category" to="/applications?category=mobile">
                Mobile
              </Link>
              <Link className="nav-category" to="/applications?category=desktop">
                Desktop
              </Link>
              <Link className="nav-category" to="/applications?category=web">
                {c('Web & API', 'Web et API')}
              </Link>
              <Link to="/applications?category=automation">
                {c('Automation', 'Automatisation')}
              </Link>
            </div>
            <div>
              <span>{c('Downloads', 'Téléchargements')}</span>
              <Link to="/downloads">{c('Latest releases', 'Dernières versions')}</Link>
              <Link to="/docs?section=verification">
                {c('Verify a file', 'Vérifier un fichier')}
              </Link>
              <a href={`${GITHUB}?tab=repositories`}>
                {c('Repositories', 'Dépôts')} <ArrowUpRight size={12} />
              </a>
            </div>
            <div>
              <span>{c('Resources', 'Ressources')}</span>
              <Link to="/docs">Documentation</Link>
              <Link to="/support">{c('Support', 'Assistance')}</Link>
              <a href={GITHUB}>
                GitHub <ArrowUpRight size={12} />
              </a>
            </div>
            <div>
              <span>CPSI LABS</span>
              <Link to="/about">{c('About', 'À propos')}</Link>
              <Link to="/legal">{c('Legal & privacy', 'Droit et confidentialité')}</Link>
            </div>
          </div>
          <div className="footer-bottom">
            <span className="footer-identity">
              <Brand footer />
              <span>© {new Date().getFullYear()} CPSI LABS · Build. Innovate. Evolve.</span>
            </span>
            <span className="footer-preferences">
              <button
                className="footer-language"
                onClick={() => setLanguage(language === 'en' ? 'fr' : 'en')}
                aria-label={
                  language === 'en' ? 'Afficher le site en français' : 'View the site in English'
                }
              >
                <span className={language === 'en' ? 'on' : ''}>English</span>
                <span className={language === 'fr' ? 'on' : ''}>Français</span>
              </button>
              <button
                className="icon-button"
                onClick={toggleTheme}
                aria-label={
                  theme === 'dark'
                    ? c('Use the light theme', 'Utiliser le thème clair')
                    : c('Use the dark theme', 'Utiliser le thème sombre')
                }
              >
                {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
              </button>
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}
