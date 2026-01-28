import { MDXRemote } from 'next-mdx-remote/rsc';
import { getContentBySlug } from '@/lib/markdown/get-content';
import { useMDXComponents } from '@/components/markdown/mdx-components';
import { notFound } from 'next/navigation';

export default async function Week0Page() {
  const content = getContentBySlug('training', 'week-0');

  if (!content) {
    notFound();
  }

  const components = useMDXComponents({});

  return (
    <div className="container max-w-4xl py-8">
      <article className="prose prose-neutral dark:prose-invert max-w-none">
        <MDXRemote source={content.content} components={components} />
      </article>
    </div>
  );
}

export async function generateMetadata() {
  const content = getContentBySlug('training', 'week-0');

  return {
    title: content?.metadata.title || 'Week 0: CLI Fundamentals',
    description: content?.metadata.description || 'Essential CLI tools for WordPress development',
  };
}
