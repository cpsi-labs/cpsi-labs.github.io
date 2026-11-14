import { AppWindow, Blocks, Globe2, Network, ShieldCheck, Workflow } from 'lucide-react';
export const disciplines = [
  {
    id: 'mobile',
    icon: Blocks,
    en: 'Mobile applications',
    fr: 'Applications mobiles',
    short: 'Mobile',
    frShort: 'Mobile',
    enText:
      'Thoughtful experiences for Android and cross-platform environments. Built around the way people actually use their devices.',
    frText:
      'Des expériences pensées pour Android et les environnements multiplateformes, au plus près des usages réels.',
    tags: ['Android', 'Cross-platform'],
    frTags: ['Android', 'Multiplateforme'],
  },
  {
    id: 'desktop',
    icon: AppWindow,
    en: 'Desktop software',
    fr: 'Logiciels desktop',
    short: 'Desktop',
    frShort: 'Desktop',
    enText:
      'Focused tools for Linux and Windows. Software that fits naturally into your everyday workflow.',
    frText:
      'Des outils ciblés pour Linux et Windows. Des logiciels qui trouvent naturellement leur place dans votre quotidien.',
    tags: ['Linux', 'Windows'],
    frTags: ['Linux', 'Windows'],
  },
  {
    id: 'web',
    icon: Globe2,
    en: 'Web applications & APIs',
    fr: 'Applications web et API',
    short: 'Web & API',
    frShort: 'Web et API',
    enText:
      'Clear interfaces and well-defined APIs. Connected experiences with maintainability at their core.',
    frText:
      'Des interfaces claires et des API bien définies. Des expériences connectées, conçues pour être maintenues.',
    tags: ['Web applications', 'APIs'],
    frTags: ['Applications web', 'API'],
  },
  {
    id: 'systems',
    icon: Network,
    en: 'Networks & systems',
    fr: 'Réseaux et systèmes',
    short: 'Systems',
    frShort: 'Systèmes',
    enText:
      'Practical utilities for understanding networks and working with systems. Make complex environments easier to navigate.',
    frText:
      'Des utilitaires pratiques pour comprendre les réseaux et travailler avec les systèmes. Rendre les environnements complexes plus lisibles.',
    tags: ['Networks', 'System tools'],
    frTags: ['Réseaux', 'Outils système'],
  },
  {
    id: 'security',
    icon: ShieldCheck,
    en: 'Security & privacy',
    fr: 'Sécurité et confidentialité',
    short: 'Security',
    frShort: 'Sécurité',
    enText:
      'Security-conscious software and privacy-minded design. Keep control of the information that matters.',
    frText:
      'Des logiciels attentifs à la sécurité et une conception soucieuse de la vie privée. Garder le contrôle des informations essentielles.',
    tags: ['Cybersecurity', 'Privacy'],
    frTags: ['Cybersécurité', 'Confidentialité'],
  },
  {
    id: 'automation',
    icon: Workflow,
    en: 'Automation & digital tools',
    fr: 'Automatisation et outils digitaux',
    short: 'Automation',
    frShort: 'Automatisation',
    enText:
      'Connect steps, remove repetition and make room for meaningful work. Purpose-built solutions for practical problems.',
    frText:
      'Relier les étapes, réduire les répétitions et libérer du temps pour le travail utile. Des solutions pensées pour des problèmes concrets.',
    tags: ['Automation', 'Digital solutions'],
    frTags: ['Automatisation', 'Solutions digitales'],
  },
] as const;
