import { getTrainingWeek } from '@/lib/markdown/get-content';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { useMDXComponents } from '@/components/markdown/mdx-components';

export default async function Week1Page() {
  const content = getTrainingWeek('week-1');

  if (!content) {
    notFound();
  }

  const components = useMDXComponents({});

  return (
    <div className="max-w-4xl mx-auto">
      <article className="prose prose-neutral dark:prose-invert max-w-none">
        <MDXRemote source={content.content} components={components} />
      </article>
    </div>
  );
}

export async function generateMetadata() {
  const content = getTrainingWeek('week-1');

  return {
    title: content?.metadata.title || 'Week 1',
    description: content?.metadata.description || 'Week 1 training content',
  };
}
