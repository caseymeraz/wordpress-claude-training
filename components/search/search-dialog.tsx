'use client';

import { useState, useEffect, useCallback } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { search, initializeSearch } from '@/lib/search';
import type { SearchResult } from '@/lib/search/types';
import { useRouter } from 'next/navigation';
import { FileText, GraduationCap } from 'lucide-react';

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Initialize search index when dialog opens
  useEffect(() => {
    if (open) {
      initializeSearch();
    }
  }, [open]);

  // Search when query changes
  useEffect(() => {
    const performSearch = async () => {
      if (query.length >= 2) {
        setIsLoading(true);
        const searchResults = await search(query);
        setResults(searchResults);
        setIsLoading(false);
      } else {
        setResults([]);
      }
    };

    const timeoutId = setTimeout(performSearch, 150); // Debounce
    return () => clearTimeout(timeoutId);
  }, [query]);

  const handleResultClick = useCallback((url: string) => {
    onOpenChange(false);
    setQuery('');
    setResults([]);
    router.push(url);
  }, [onOpenChange, router]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onOpenChange(false);
    }
  }, [onOpenChange]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl p-0 gap-0" onKeyDown={handleKeyDown}>
        <div className="border-b">
          <Input
            placeholder="Search training materials..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border-0 focus-visible:ring-0 h-14 text-lg px-6"
            autoFocus
          />
        </div>

        <div className="max-h-[400px] overflow-y-auto">
          {isLoading ? (
            <div className="text-center text-muted-foreground py-8">
              Searching...
            </div>
          ) : results.length > 0 ? (
            <div className="p-2">
              {results.map((result, index) => {
                const Icon = result.category === 'training' ? GraduationCap : FileText;

                return (
                  <button
                    key={`${result.url}-${index}`}
                    onClick={() => handleResultClick(result.url)}
                    className="w-full text-left p-4 rounded-lg hover:bg-accent transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <Icon className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="font-semibold truncate">{result.title}</div>
                          <Badge variant="secondary" className="shrink-0 text-xs">
                            {result.category}
                          </Badge>
                        </div>
                        {result.description && (
                          <p className="text-sm text-muted-foreground line-clamp-1 mb-1">
                            {result.description}
                          </p>
                        )}
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {result.excerpt}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          ) : query.length >= 2 ? (
            <div className="text-center text-muted-foreground py-8">
              No results found for "{query}"
            </div>
          ) : (
            <div className="text-center text-muted-foreground py-8">
              <p className="mb-2">Start typing to search...</p>
              <p className="text-xs">Search training materials, exercises, and resources</p>
            </div>
          )}
        </div>

        <div className="border-t p-3 text-xs text-muted-foreground flex items-center justify-between bg-muted/50">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 text-xs bg-background border rounded">↑</kbd>
              <kbd className="px-1.5 py-0.5 text-xs bg-background border rounded">↓</kbd>
              <span>to navigate</span>
            </div>
            <div className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 text-xs bg-background border rounded">↵</kbd>
              <span>to select</span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 text-xs bg-background border rounded">esc</kbd>
            <span>to close</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
