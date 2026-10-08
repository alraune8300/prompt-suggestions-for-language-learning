export interface VocabEntry {
  en: string;
  fr: string;
  de: string;
  pos?: string;
  definitionEn: string;
  definitionFr: string;
  definitionDe: string;
}

export interface TopicItem {
  id: string;
  category: 'culture' | 'education' | 'economy' | 'technology' | 'arts' | 'humanities';
  topicEn: string;
  topicFr: string;
  topicDe: string;
  vocab?: VocabEntry[];
  promptEn?: string;
  promptFr?: string;
  promptDe?: string;
}
