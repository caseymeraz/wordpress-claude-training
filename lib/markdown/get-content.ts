import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'content');

export interface ContentMetadata {
  title: string;
  description?: string;
  week?: number;
  order?: number;
  category?: string;
}

export interface ContentFile {
  slug: string;
  metadata: ContentMetadata;
  content: string;
}

/**
 * Get all content files from a directory
 */
export function getContentFiles(directory: 'training' | 'resources'): ContentFile[] {
  const dirPath = path.join(contentDirectory, directory);

  if (!fs.existsSync(dirPath)) {
    return [];
  }

  const files = fs.readdirSync(dirPath);

  return files
    .filter((file) => file.endsWith('.mdx') || file.endsWith('.md'))
    .map((file) => {
      const filePath = path.join(dirPath, file);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContent);

      return {
        slug: file.replace(/\.mdx?$/, ''),
        metadata: data as ContentMetadata,
        content,
      };
    })
    .sort((a, b) => (a.metadata.order || 0) - (b.metadata.order || 0));
}

/**
 * Get a single content file by slug
 */
export function getContentBySlug(
  directory: 'training' | 'resources',
  slug: string
): ContentFile | null {
  const files = getContentFiles(directory);
  return files.find((file) => file.slug === slug) || null;
}

/**
 * Get all training week files
 */
export function getTrainingWeeks(): ContentFile[] {
  return getContentFiles('training');
}

/**
 * Get a specific training week
 */
export function getTrainingWeek(weekSlug: string): ContentFile | null {
  return getContentBySlug('training', weekSlug);
}
