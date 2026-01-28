import Fuse from 'fuse.js';
import type { SearchIndexItem, SearchResult } from './types';

let fuseInstance: Fuse<SearchIndexItem> | null = null;
let searchIndex: SearchIndexItem[] = [];

/**
 * Initialize the search index
 */
export async function initializeSearch(): Promise<void> {
  if (fuseInstance) return;

  try {
    const response = await fetch('/search-index.json');
    searchIndex = await response.json();

    fuseInstance = new Fuse(searchIndex, {
      keys: [
        { name: 'title', weight: 2 },
        { name: 'description', weight: 1.5 },
        { name: 'content', weight: 1 },
      ],
      threshold: 0.3,
      includeScore: true,
      minMatchCharLength: 2,
    });
  } catch (error) {
    console.error('Failed to initialize search:', error);
  }
}

/**
 * Search the content
 */
export async function search(query: string): Promise<SearchResult[]> {
  if (!fuseInstance) {
    await initializeSearch();
  }

  if (!fuseInstance || query.length < 2) {
    return [];
  }

  const results = fuseInstance.search(query);

  return results.slice(0, 10).map((result) => ({
    title: result.item.title,
    description: result.item.description,
    url: result.item.url,
    category: result.item.category,
    excerpt: result.item.content.substring(0, 150) + '...',
  }));
}
