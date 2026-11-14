import { GithubIcon } from './GithubIcon';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ArrowUpRight, Globe2, Menu, Moon, Sun, X, ArrowRight } from 'lucide-react';
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
      <span className="brand-symbol">
        <img src="/brand/symbol.webp" alt="" width="40" height="30" />
      </span>
      <span>
        CPSI <b>LABS</b>
        <span className="brand-point" />
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
            <NavLink to="/applications">{c('Applications', 'Applications')}</NavLink>
            <NavLink to="/downloads">{c('Downloads', 'Téléchargements')}</NavLink>
            <NavLink to="/docs">{c('Documentation', 'Documentation')}</NavLink>
            <NavLink to="/about">{c('About', 'À propos')}</NavLink>
            <NavLink to="/support">{c('Support', 'Assistance')}</NavLink>
          </nav>
          <div className="header-tools">
            <button
              className="language-control"
              onClick={() => setLanguage(language === 'en' ? 'fr' : 'en')}
              aria-label={language === 'en' ? 'Passer en français' : 'Switch to English'}
            >
              <Globe2 size={15} />
              <span>{language.toUpperCase()}</span>
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
              <GithubIcon size={19} />
              <ArrowUpRight size={13} />
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
          <div className="footer-top">
            <div>
              <Brand footer />
              <p>
                {c(
                  'Independent thinking. Purposeful software.',
                  'Penser librement. Développer avec sens.',
                )}
              </p>
              <span className="footer-slogan">Build. Innovate. Evolve.</span>
            </div>
            <div className="footer-links">
              <div>
                <span>{c('Explore', 'Explorer')}</span>
                <Link to="/applications">Applications</Link>
                <Link to="/downloads">{c('Downloads', 'Téléchargements')}</Link>
                <Link to="/about">{c('About the lab', 'Le laboratoire')}</Link>
              </div>
              <div>
                <span>{c('Resources', 'Ressources')}</span>
                <Link to="/docs">Documentation</Link>
                <Link to="/support">Support</Link>
                <Link to="/legal">{c('Legal & privacy', 'Droit et confidentialité')}</Link>
              </div>
              <div>
                <span>{c('Stay connected', 'Restons connectés')}</span>
                <a href={GITHUB}>
                  GitHub <ArrowUpRight size={13} />
                </a>
                <p className="footer-note">{c('Our official channel.', 'Notre canal officiel.')}</p>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} CPSI LABS</span>
            <span>
              {c('Built with care. Made to evolve.', 'Conçu avec soin. Pensé pour évoluer.')}
            </span>
            <Link to="/legal">
              {c('Privacy, by intention.', 'La confidentialité, par choix.')}{' '}
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
}
