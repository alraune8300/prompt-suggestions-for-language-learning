import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Copy, 
  Check, 
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { 
  ALL_TOPICS, 
  CategoryId, 
  TopicItem, 
  getRandomTopic, 
  countWords 
} from './data/topics';
import { CategoryDropdown } from './components/CategoryDropdown';
import { AppLanguage, UI_TRANSLATIONS } from './data/translations';

export default function App() {
  const [appLang, setAppLang] = useState<AppLanguage>('en');
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('all');
  const [currentTopic, setCurrentTopic] = useState<TopicItem>(() => ALL_TOPICS[0]);
  const [copied, setCopied] = useState(false);

  const t = UI_TRANSLATIONS[appLang];

  // Roll next topic
  const rollNewTopic = useCallback(() => {
    const next = getRandomTopic(selectedCategory, currentTopic?.id);
    setCurrentTopic(next);
  }, [selectedCategory, currentTopic]);

  // Active topic title based on current language
  const getActiveTitle = (item: TopicItem, lang: AppLanguage): string => {
    if (lang === 'fr') return item.topicFr;
    if (lang === 'de') return item.topicDe;
    return item.topicEn;
  };

  const displayTitle = getActiveTitle(currentTopic, appLang);
  const wordCount = countWords(displayTitle);

  // Copy topic to clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(displayTitle);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  // Direct educational query / search on Google Scholar / Google
  const handleSearchQuery = () => {
    const query = encodeURIComponent(`"${displayTitle}"`);
    window.open(`https://www.google.com/search?q=${query}`, '_blank', 'noopener,noreferrer');
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      if (e.code === 'Space' || e.key === 'Enter') {
        e.preventDefault();
        rollNewTopic();
      } else if (e.key.toLowerCase() === 'c') {
        e.preventDefault();
        handleCopy();
      } else if (e.key.toLowerCase() === 'q') {
        e.preventDefault();
        handleSearchQuery();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [rollNewTopic, displayTitle]);

  return (
    <div className="min-h-screen w-full bg-white text-neutral-900 flex flex-col justify-between selection:bg-neutral-900 selection:text-white relative overflow-x-hidden font-sans">
      {/* ================= TOP BAR (BORDERLESS, STREAMLINED ACCORDION NEXT TO LANGUAGE SELECTOR) ================= */}
      <header className="w-full px-6 py-4 flex items-center justify-between gap-4 z-10">
        {/* Left: Minimalist brand indicator */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-widest text-neutral-400">
            Topic Generator
          </span>
        </div>

        {/* Right: Grouped Category Accordion Dropdown NEXT TO Language Selector + Lucide Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Topic Accordion Menu: Fixed width (no expanding/shrinking), borderless */}
          <CategoryDropdown
            selectedCategory={selectedCategory}
            onSelectCategory={(cat) => {
              setSelectedCategory(cat);
              const next = getRandomTopic(cat, currentTopic?.id);
              setCurrentTopic(next);
            }}
            lang={appLang}
          />

          {/* Language Selector: EN / FR / DE (Borderless) */}
          <div className="flex items-center bg-neutral-100/90 p-0.5 rounded-xl text-xs font-medium h-9">
            <button
              type="button"
              onClick={() => setAppLang('en')}
              className={`px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
                appLang === 'en'
                  ? 'bg-white text-neutral-900 shadow-2xs font-semibold'
                  : 'text-neutral-500 hover:text-neutral-900'
              }`}
              title="English"
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setAppLang('fr')}
              className={`px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
                appLang === 'fr'
                  ? 'bg-white text-neutral-900 shadow-2xs font-semibold'
                  : 'text-neutral-500 hover:text-neutral-900'
              }`}
              title="Français"
            >
              FR
            </button>
            <button
              type="button"
              onClick={() => setAppLang('de')}
              className={`px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
                appLang === 'de'
                  ? 'bg-white text-neutral-900 shadow-2xs font-semibold'
                  : 'text-neutral-500 hover:text-neutral-900'
              }`}
              title="Deutsch"
            >
              DE
            </button>
          </div>

          {/* Lucide Icon: 1-Click Pedagogical Search & Information Query */}
          <button
            type="button"
            onClick={handleSearchQuery}
            className="w-9 h-9 flex items-center justify-center bg-neutral-100/90 hover:bg-neutral-200/80 text-neutral-600 hover:text-neutral-950 rounded-xl transition duration-150 cursor-pointer"
            title={`${t.searchTopic} [Q]`}
            aria-label={t.searchTopic}
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Lucide Icon: 1-Click Copy Topic */}
          <button
            type="button"
            onClick={handleCopy}
            className="w-9 h-9 flex items-center justify-center bg-neutral-100/90 hover:bg-neutral-200/80 text-neutral-600 hover:text-neutral-950 rounded-xl transition duration-150 cursor-pointer"
            title={`${t.copy} [C]`}
            aria-label={t.copy}
          >
            {copied ? (
              <Check className="w-4 h-4 text-emerald-600" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>
        </div>
      </header>

      {/* ================= MAIN HERO (STRICTLY FAITHFUL TO FRAME 1.PNG, ZERO CLUTTER) ================= */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-12 text-center max-w-5xl mx-auto w-full select-none">
        {/* Top Header matching Frame 1.png: "TOPIC GENERATOR" */}
        <div className="mb-14 md:mb-20">
          <h1 className="font-generator-title text-3xl sm:text-5xl md:text-6xl text-neutral-950 uppercase tracking-[0.24em] transition-all duration-300">
            {t.appTitle}
          </h1>
          <p className="mt-3 text-xs tracking-widest text-neutral-400 uppercase font-light">
            {t.appSubtitle}
          </p>
        </div>

        {/* Center Display: "TOPIC NAME" */}
        <div className="min-h-[140px] md:min-h-[170px] flex flex-col items-center justify-center max-w-3xl w-full px-4 mb-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${currentTopic.id}-${appLang}`}
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center"
            >
              {/* Category & Word count metadata (no pill, clean typographic separator) */}
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-neutral-400 font-medium mb-3">
                <span>{(t as any)[currentTopic.category] || currentTopic.category}</span>
                <span aria-hidden="true">·</span>
                <span className="text-neutral-500 font-mono text-[11px] lowercase">
                  {t.wordsCount(wordCount)}
                </span>
              </div>

              {/* Central topic headline: clean uppercase tracking */}
              <h2 className="font-topic-display text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-normal text-neutral-900 uppercase tracking-[0.18em] leading-snug text-balance">
                {displayTitle}
              </h2>

              {/* Secondary English reference when in French or German */}
              {appLang !== 'en' && (
                <p className="mt-2 text-xs md:text-sm text-neutral-400 font-light tracking-wide">
                  EN: {currentTopic.topicEn}
                </p>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Primary Action Button matching Frame 1.png: "click to get new topic" */}
        <div className="flex flex-col items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={rollNewTopic}
            className="font-action-btn px-9 py-3.5 bg-[#f4f4f4] hover:bg-[#eaeaea] text-neutral-800 text-xs md:text-sm tracking-[0.16em] rounded-xl transition duration-150 shadow-2xs hover:shadow-xs active:bg-neutral-200 cursor-pointer"
            aria-label={t.buttonLabel}
          >
            {t.buttonLabel}
          </motion.button>
        </div>
      </main>

      {/* ================= FOOTER / KEYBOARD SHORTCUTS ================= */}
      <footer className="w-full px-6 py-4 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-400 gap-2">
        <div className="flex items-center gap-2">
          <span>Shortcuts:</span>
          <kbd className="px-1.5 py-0.5 bg-neutral-100 rounded text-[11px] text-neutral-600 font-mono">
            Space
          </kbd>
          <kbd className="px-1.5 py-0.5 bg-neutral-100 rounded text-[11px] text-neutral-600 font-mono">
            Enter
          </kbd>
          <span>Roll</span>
          <span className="text-neutral-200">·</span>
          <kbd className="px-1.5 py-0.5 bg-neutral-100 rounded text-[11px] text-neutral-600 font-mono">
            Q
          </kbd>
          <span>Search</span>
          <span className="text-neutral-200">·</span>
          <kbd className="px-1.5 py-0.5 bg-neutral-100 rounded text-[11px] text-neutral-600 font-mono">
            C
          </kbd>
          <span>Copy</span>
        </div>

        <div className="text-neutral-400">
          {t.footerTagline}
        </div>
      </footer>
    </div>
  );
}
