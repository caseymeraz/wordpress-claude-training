import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

interface SearchIndexItem {
  slug: string;
  title: string;
  description: string;
  content: string;
  excerpt: string;
  url: string;
  category: string;
}

const contentDir = path.join(process.cwd(), 'content');
const outputFile = path.join(process.cwd(), 'public', 'search-index.json');

function getAllMdxFiles(dir: string, basePath: string = ''): string[] {
  const files: string[] = [];
  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      files.push(...getAllMdxFiles(fullPath, path.join(basePath, item)));
    } else if (item.endsWith('.mdx') || item.endsWith('.md')) {
      files.push(path.join(basePath, item));
    }
  }

  return files;
}

function stripMarkdown(text: string): string {
  return text
    // Remove code blocks
    .replace(/```[\s\S]*?```/g, '')
    // Remove inline code
    .replace(/`[^`]+`/g, '')
    // Remove headings
    .replace(/#{1,6}\s+/g, '')
    // Remove bold
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    // Remove italic
    .replace(/\*([^*]+)\*/g, '$1')
    // Remove links but keep text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    // Remove HTML tags
    .replace(/<[^>]+>/g, '')
    // Remove extra whitespace
    .replace(/\s+/g, ' ')
    .trim();
}

function buildSearchIndex() {
  const searchIndex: SearchIndexItem[] = [];

  // Get all MDX files
  const mdxFiles = getAllMdxFiles(contentDir);

  console.log(`Found ${mdxFiles.length} MDX files`);

  for (const file of mdxFiles) {
    const fullPath = path.join(contentDir, file);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    // Determine category and URL from file path
    const parts = file.split(path.sep);
    let category = 'Other';
    let url = '/';
    let slug = '';

    if (parts[0] === 'training') {
      category = 'Training';
      const filename = parts[1].replace(/\.mdx?$/, '');
      slug = filename;

      if (filename === 'overview') {
        url = '/training/overview';
      } else if (filename.startsWith('week-')) {
        url = `/training/${filename}`;
      }
    } else if (parts[0] === 'resources') {
      category = 'Resources';
      const filename = parts[1].replace(/\.mdx?$/, '');
      slug = filename;
      url = `/resources/${filename}`;
    }

    // Strip markdown and create excerpt
    const strippedContent = stripMarkdown(content);
    const excerpt = strippedContent.substring(0, 200) + (strippedContent.length > 200 ? '...' : '');

    searchIndex.push({
      slug,
      title: data.title || 'Untitled',
      description: data.description || '',
      content: strippedContent,
      excerpt,
      url,
      category,
    });
  }

  // Ensure public directory exists
  const publicDir = path.join(process.cwd(), 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  // Write search index
  fs.writeFileSync(outputFile, JSON.stringify(searchIndex, null, 2));

  console.log(`✅ Search index built successfully`);
  console.log(`📝 Indexed ${searchIndex.length} items`);
  console.log(`💾 Saved to: ${outputFile}`);
}

// Run the builder
buildSearchIndex();
