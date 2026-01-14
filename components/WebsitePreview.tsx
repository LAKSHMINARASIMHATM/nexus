import { ExternalLink, Clock, Calendar, TrendingUp, Shield, Globe } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

// Helper function to normalize text and fix rendering issues
const normalizeText = (text: string) => {
  return text
    .replace(/<em>/g, '')
    .replace(/<\/em>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
};

interface WebsitePreviewProps {
  url: string;
  title: string;
  description?: string;
  favicon?: string;
  category?: string;
  lastIndexed?: string;
  trustScore?: number;
  popularity?: number;
  metadata?: {
    published_date?: string;
    author?: string;
    word_count?: number;
    language?: string;
  };
  compact?: boolean;
}

export function WebsitePreview({
  url,
  title,
  description,
  favicon,
  category,
  lastIndexed,
  trustScore,
  popularity,
  metadata,
  compact = false
}: WebsitePreviewProps) {
  const domain = new URL(url).hostname;
  const faviconUrl = favicon || `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
  
  // Normalize text to fix rendering issues
  const normalizedTitle = normalizeText(title);
  const normalizedDescription = description ? normalizeText(description) : '';

  if (compact) {
    return (
      <div className="group flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-all border border-transparent hover:border-border cursor-pointer">
        <img
          src={faviconUrl}
          alt={domain}
          className="w-8 h-8 rounded-lg flex-shrink-0 border border-border bg-background"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            target.nextElementSibling?.classList.remove('hidden');
          }}
        />
        <div className="w-8 h-8 rounded-lg flex-shrink-0 border border-border bg-muted items-center justify-center hidden">
          <Globe className="w-4 h-4 text-muted-foreground" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-medium text-muted-foreground">{domain}</span>
            {category && (
              <Badge variant="secondary" className="text-xs px-1.5 py-0.5">
                {category}
              </Badge>
            )}
          </div>
          <h3 className="font-semibold text-sm group-hover:text-primary transition-colors line-clamp-2 mb-1">
            {normalizedTitle}
          </h3>
          {normalizedDescription && (
            <p className="text-xs text-muted-foreground line-clamp-2">
              {normalizedDescription}
            </p>
          )}
        </div>
        <div className="flex flex-col items-end gap-1 text-xs text-muted-foreground">
          {popularity && (
            <div className="flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              <span>{(popularity / 1000).toFixed(1)}k</span>
            </div>
          )}
          {trustScore && (
            <div className="flex items-center gap-1">
              <Shield className="w-3 h-3" />
              <span>{trustScore}%</span>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20 cursor-pointer overflow-hidden">
      <CardContent className="p-0">
        {/* Header with favicon and domain */}
        <div className="flex items-center justify-between p-4 border-b border-border/50 bg-muted/30">
          <div className="flex items-center gap-3">
            <img
              src={faviconUrl}
              alt={domain}
              className="w-10 h-10 rounded-xl flex-shrink-0 border border-border bg-background shadow-sm"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                target.nextElementSibling?.classList.remove('hidden');
              }}
            />
            <div className="w-10 h-10 rounded-xl flex-shrink-0 border border-border bg-muted items-center justify-center hidden">
              <Globe className="w-5 h-5 text-muted-foreground" />
            </div>
            <div>
              <h4 className="font-semibold text-sm group-hover:text-primary transition-colors line-clamp-1">
                {domain}
              </h4>
              <div className="flex items-center gap-2 mt-1">
                {category && (
                  <Badge variant="secondary" className="text-xs">
                    {category}
                  </Badge>
                )}
                {trustScore && (
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Shield className="w-3 h-3" />
                    <span>{trustScore}% Trust</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          <h3 className="font-bold text-lg group-hover:text-primary transition-colors line-clamp-2">
            {normalizedTitle}
          </h3>
          
          {normalizedDescription && (
            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
              {normalizedDescription}
            </p>
          )}

          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground pt-2">
            {metadata?.published_date && (
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span>{metadata.published_date}</span>
              </div>
            )}
            {metadata?.author && (
              <span>By {metadata.author}</span>
            )}
            {metadata?.word_count && (
              <span>{(metadata.word_count / 1000).toFixed(1)}k words</span>
            )}
            {metadata?.language && (
              <span>{metadata.language.toUpperCase()}</span>
            )}
            {popularity && (
              <div className="flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                <span>{(popularity / 1000).toFixed(1)}k views</span>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-4 bg-muted/20 border-t border-border/50">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Clock className="w-3 h-3" />
            <span>Indexed {lastIndexed || 'recently'}</span>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-1.5 hover:bg-muted rounded-lg transition-colors">
              <ExternalLink className="w-4 h-4" />
            </button>
            <button className="p-1.5 hover:bg-muted rounded-lg transition-colors">
              <span className="material-symbols-outlined text-sm">bookmark_border</span>
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Simplified version for search results
export function SearchResultPreview({
  url,
  title,
  description,
  favicon,
  category,
  trustScore,
  metadata,
  position
}: WebsitePreviewProps & { position?: number }) {
  const domain = new URL(url).hostname;
  const faviconUrl = favicon || `https://www.google.com/s2/favicons?domain=${domain}&sz=32`;
  
  // Normalize text to fix rendering issues
  const normalizedTitle = normalizeText(title);
  const normalizedDescription = description ? normalizeText(description) : '';

  return (
    <div className="group space-y-2 py-3">
      {/* Position indicator and domain */}
      <div className="flex items-center gap-3">
        {position && (
          <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
            {position}
          </div>
        )}
        <div className="flex items-center gap-2">
          <img
            src={faviconUrl}
            alt={domain}
            className="w-4 h-4"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              target.nextElementSibling?.classList.remove('hidden');
            }}
          />
          <Globe className="w-4 h-4 text-muted-foreground hidden" />
          <span className="text-sm text-muted-foreground">{domain}</span>
        </div>
        {category && (
          <Badge variant="outline" className="text-xs">
            {category}
          </Badge>
        )}
        {trustScore && (
          <Badge variant="secondary" className="text-xs">
            Score: {trustScore}%
          </Badge>
        )}
      </div>

      {/* Title */}
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="block group"
      >
        <h3 className="text-xl font-semibold text-blue-600 group-hover:text-blue-700 visited:text-purple-800 transition-colors line-clamp-2">
          {normalizedTitle}
        </h3>
      </a>

      {/* Description */}
      {normalizedDescription && (
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
          {normalizedDescription}
        </p>
      )}

      {/* Metadata */}
      <div className="flex items-center gap-4 text-xs text-muted-foreground">
        {metadata?.published_date && (
          <span>{metadata.published_date}</span>
        )}
        {metadata?.author && (
          <span>By {metadata.author}</span>
        )}
        {metadata?.word_count && (
          <span>{metadata.word_count.toLocaleString()} words</span>
        )}
      </div>
    </div>
  );
}
