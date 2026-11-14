// Ajouter uniquement des applications réellement publiées. Voir README.md.
const applications = [];
const catalogue = document.getElementById('catalogue');
function safeLink(value) { try { const u = new URL(value); return u.origin === 'https://github.com' && u.pathname.startsWith('/cpsi-labs/') ? u.href : null; } catch { return null; } }
function element(tag, text, className) { const e = document.createElement(tag); e.textContent = text; if(className) e.className = className; return e; }
if (applications.length) {
  catalogue.replaceChildren();
  for (const app of applications) {
    const card = element('article', '', 'card');
    card.append(element('span', app.platform, 'pill'), element('h3', app.name), element('p', app.description), element('p', `${app.version} · ${app.license}`));
    for (const [title, url] of [['Télécharger / versions', app.releases], ['Documentation', app.docs]]) {
      const href = safeLink(url); if (!href) continue;
      const p = element('p',''); const link = element('a', title + ' ↗', 'textlink'); link.href = href; p.append(link); card.append(p);
    }
    catalogue.append(card);
  }
}
