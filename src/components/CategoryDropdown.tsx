import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check, Layers } from 'lucide-react';
import { CATEGORIES, CategoryId, getCategoryCount } from '../data/topics';
import { AppLanguage, UI_TRANSLATIONS } from '../data/translations';

interface CategoryDropdownProps {
  selectedCategory: CategoryId;
  onSelectCategory: (cat: CategoryId) => void;
  lang: AppLanguage;
}

export const CategoryDropdown: React.FC<CategoryDropdownProps> = ({
  selectedCategory,
  onSelectCategory,
  lang,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const t = UI_TRANSLATIONS[lang];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEsc);
    };
  }, []);

  const getCategoryLabel = (catId: CategoryId): string => {
    const found = CATEGORIES.find((c) => c.id === catId);
    if (!found) return t.allDomains;
    return (t as any)[found.key] || t.allDomains;
  };

  const currentLabel = getCategoryLabel(selectedCategory);
  const currentCount = getCategoryCount(selectedCategory);

  return (
    <div className="relative inline-block text-left" ref={containerRef}>
      {/* Fixed-width trigger: prevents stretching or shrinking with text length */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-48 sm:w-56 h-9 flex items-center justify-between px-3 text-xs font-medium text-neutral-800 bg-neutral-100/90 hover:bg-neutral-200/80 rounded-xl transition duration-150 focus:outline-none cursor-pointer"
        aria-expanded={isOpen}
        aria-haspopup="true"
        title={currentLabel}
      >
        <div className="flex items-center gap-2 min-w-0 flex-1 pr-1.5">
          <Layers className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
          <span className="truncate text-left text-neutral-800">
            {currentLabel}
          </span>
        </div>
        <div className="flex items-center gap-1 shrink-0 text-neutral-400">
          <span className="text-[10px] font-mono">
            {currentCount}
          </span>
          <ChevronDown
            className={`w-3.5 h-3.5 transition-transform duration-200 shrink-0 ${
              isOpen ? 'rotate-180 text-neutral-900' : 'text-neutral-400'
            }`}
          />
        </div>
      </button>

      {/* Dropdown panel */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
          <div className="px-3.5 py-2 text-[11px] font-semibold tracking-wider uppercase text-neutral-400 flex items-center justify-between bg-neutral-50/50 rounded-t-xl">
            <span>{t.selectDomain}</span>
            <span className="text-neutral-400 font-mono text-[10px]">{getCategoryCount('all')} topics</span>
          </div>

          <div className="max-h-72 overflow-y-auto py-1">
            {CATEGORIES.map((cat) => {
              const label = (t as any)[cat.key] || t.allDomains;
              const count = getCategoryCount(cat.id);
              const isSelected = selectedCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    onSelectCategory(cat.id);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 text-xs text-left transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-neutral-900 text-white font-medium'
                      : 'text-neutral-700 hover:bg-neutral-100/70 hover:text-black'
                  }`}
                >
                  <span className="truncate pr-2">{label}</span>
                  <div className="flex items-center gap-2 shrink-0">
                    <span
                      className={`text-[10px] font-mono ${
                        isSelected ? 'text-neutral-300' : 'text-neutral-400'
                      }`}
                    >
                      {count}
                    </span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
