import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { SearchIndexItem } from './types';

const contentDirectory = path.join(process.cwd(), 'content');

function buildSearchIndex(): SearchIndexItem[] {
  const index: SearchIndexItem[] = [];

  // Training content
  const trainingDir = path.join(contentDirectory, 'training');
  if (fs.existsSync(trainingDir)) {
    const trainingFiles = fs.readdirSync(trainingDir);

    trainingFiles.forEach((file) => {
      if (file.endsWith('.mdx') || file.endsWith('.md')) {
        const filePath = path.join(trainingDir, file);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const { data, content } = matter(fileContent);

        const slug = file.replace(/\.mdx?$/, '');

        index.push({
          id: `training-${slug}`,
          title: data.title || slug,
          description: data.description || '',
          content: content.replace(/[#*`]/g, '').substring(0, 500), // Remove markdown syntax
          url: `/training/${slug}`,
          category: 'training',
        });
      }
    });
  }

  // Resources content
  const resourcesDir = path.join(contentDirectory, 'resources');
  if (fs.existsSync(resourcesDir)) {
    const resourceFiles = fs.readdirSync(resourcesDir);

    resourceFiles.forEach((file) => {
      if (file.endsWith('.mdx') || file.endsWith('.md')) {
        const filePath = path.join(resourcesDir, file);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const { data, content } = matter(fileContent);

        const slug = file.replace(/\.mdx?$/, '');

        index.push({
          id: `resources-${slug}`,
          title: data.title || slug,
          description: data.description || '',
          content: content.replace(/[#*`]/g, '').substring(0, 500),
          url: `/resources/${slug}`,
          category: 'resources',
        });
      }
    });
  }

  return index;
}

// Export for use in scripts
export { buildSearchIndex };

// For direct execution
if (require.main === module) {
  const index = buildSearchIndex();
  const outputPath = path.join(process.cwd(), 'public', 'search-index.json');

  // Ensure public directory exists
  const publicDir = path.dirname(outputPath);
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  fs.writeFileSync(outputPath, JSON.stringify(index, null, 2));
  console.log(`✓ Search index built: ${index.length} items`);
}
