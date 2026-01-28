import type { MDXComponents } from 'mdx/types';
import { useMDXComponents as getMDXComponents } from './components/markdown/mdx-components';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return getMDXComponents(components);
}
