export type AppLanguage = 'en' | 'fr' | 'de';

export interface UiTranslations {
  appTitle: string;
  appSubtitle: string;
  buttonLabel: string;
  allDomains: string;
  selectDomain: string;
  culture: string;
  education: string;
  economy: string;
  technology: string;
  arts: string;
  humanities: string;
  wordsCount: (count: number) => string;
  copy: string;
  copied: string;
  searchTopic: string;
  shortcutsHint: string;
  footerTagline: string;
}

export const UI_TRANSLATIONS: Record<AppLanguage, UiTranslations> = {
  en: {
    appTitle: 'TOPIC GENERATOR',
    appSubtitle: 'Pedagogical language learning topics · Maximum 4 words',
    buttonLabel: 'click to get new topic',
    allDomains: 'All Domains',
    selectDomain: 'Select Domain',
    culture: 'Culture',
    education: 'Education',
    economy: 'Economy',
    technology: 'Modern Technology',
    arts: 'Arts & Design',
    humanities: 'Social Sciences & Humanities',
    wordsCount: (c) => `${c} ${c === 1 ? 'word' : 'words'}`,
    copy: 'Copy Topic',
    copied: 'Copied!',
    searchTopic: 'Search & Query Topic',
    shortcutsHint: 'Shortcuts: [Space / Enter] New topic · [C] Copy · [Q] Query & Search',
    footerTagline: 'Curated keyword topics · English, Français & Deutsch · Maximum 4 words',
  },
  fr: {
    appTitle: 'GÉNÉRATEUR DE SUJETS',
    appSubtitle: 'Sujets d’apprentissage linguistique · 4 mots au maximum',
    buttonLabel: 'cliquer pour un nouveau sujet',
    allDomains: 'Tous les domaines',
    selectDomain: 'Choisir le domaine',
    culture: 'Culture',
    education: 'Éducation',
    economy: 'Économie',
    technology: 'Technologies modernes',
    arts: 'Arts & Design',
    humanities: 'Sciences humaines & sociales',
    wordsCount: (c) => `${c} ${c === 1 ? 'mot' : 'mots'}`,
    copy: 'Copier le sujet',
    copied: 'Copié !',
    searchTopic: 'Rechercher & Se documenter',
    shortcutsHint: 'Raccourcis: [Espace / Entrée] Nouveau sujet · [C] Copier · [Q] Rechercher',
    footerTagline: 'Banque thématique vérifiée · Anglais, Français & Allemand · Maximum 4 mots',
  },
  de: {
    appTitle: 'THEMEN GENERATOR',
    appSubtitle: 'Didaktische Sprachthemen · Maximal 4 Wörter',
    buttonLabel: 'klicken für neues thema',
    allDomains: 'Alle Bereiche',
    selectDomain: 'Bereich wählen',
    culture: 'Kultur',
    education: 'Bildung',
    economy: 'Wirtschaft',
    technology: 'Moderne Technologie',
    arts: 'Kunst & Design',
    humanities: 'Geistes- & Sozialwissenschaften',
    wordsCount: (c) => `${c} ${c === 1 ? 'Wort' : 'Wörter'}`,
    copy: 'Thema kopieren',
    copied: 'Kopiert!',
    searchTopic: 'Thema recherchieren',
    shortcutsHint: 'Tastenkürzel: [Leertaste / Enter] Neues Thema · [C] Kopieren · [Q] Recherchieren',
    footerTagline: 'Kuratierte Begriffssammlung · Englisch, Französisch & Deutsch · Maximal 4 Wörter',
  },
};
