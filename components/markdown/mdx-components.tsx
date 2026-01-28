import type { MDXComponents } from 'mdx/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Headings
    h1: ({ children }) => (
      <h1 className="scroll-m-20 text-4xl font-bold tracking-tight mb-4">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 mb-4 mt-10">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-3 mt-8">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="scroll-m-20 text-xl font-semibold tracking-tight mb-2 mt-6">
        {children}
      </h4>
    ),

    // Paragraphs and text
    p: ({ children }) => (
      <p className="leading-7 [&:not(:first-child)]:mt-4 mb-4">
        {children}
      </p>
    ),

    // Lists
    ul: ({ children }) => (
      <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="my-6 ml-6 list-decimal [&>li]:mt-2">
        {children}
      </ol>
    ),
    li: ({ children }) => <li className="leading-7">{children}</li>,

    // Code
    code: ({ children, className }) => {
      const isInline = !className;
      return isInline ? (
        <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
          {children}
        </code>
      ) : (
        <code className={className}>{children}</code>
      );
    },
    pre: ({ children }) => (
      <pre className="mb-4 mt-6 overflow-x-auto rounded-lg border bg-black p-4">
        <code className="relative rounded font-mono text-sm text-white">
          {children}
        </code>
      </pre>
    ),

    // Links
    a: ({ href, children }) => (
      <a
        href={href}
        className="font-medium text-primary underline underline-offset-4 hover:text-primary/80"
        target={href?.startsWith('http') ? '_blank' : undefined}
        rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    ),

    // Blockquotes
    blockquote: ({ children }) => (
      <blockquote className="mt-6 border-l-2 pl-6 italic text-muted-foreground">
        {children}
      </blockquote>
    ),

    // Tables
    table: ({ children }) => (
      <div className="my-6 w-full overflow-y-auto">
        <table className="w-full border-collapse border">
          {children}
        </table>
      </div>
    ),
    thead: ({ children }) => (
      <thead className="bg-muted/50">{children}</thead>
    ),
    tbody: ({ children }) => <tbody>{children}</tbody>,
    tr: ({ children }) => (
      <tr className="border-b transition-colors hover:bg-muted/50">
        {children}
      </tr>
    ),
    th: ({ children }) => (
      <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
        {children}
      </td>
    ),

    // Horizontal rule
    hr: () => <hr className="my-8 border-border" />,

    // Custom components
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    Badge,

    ...components,
  };
}
