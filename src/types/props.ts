export interface BaseLayoutProps {
  title: string;
  description: string;
  image?: string;
  canonicalURL?: string;
}

export interface ContentLayoutProps {
  title: string;
  description: string;
  type?: string;
}

export interface ArticleCardProps {
  title: string;
  description?: string;
  url: string;
  tags?: string[];
}

export interface SectionProps {
  title?: string;
  subtitle?: string;
  className?: string;
}

export interface ContainerProps {
  className?: string;
  as?: keyof HTMLElementTagNameMap;
}
