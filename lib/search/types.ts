export interface SearchResult {
  title: string;
  description: string;
  url: string;
  category: 'training' | 'resources';
  excerpt: string;
}

export interface SearchIndexItem {
  id: string;
  title: string;
  description: string;
  content: string;
  url: string;
  category: 'training' | 'resources';
}
