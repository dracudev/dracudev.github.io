import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';

type Project = CollectionEntry<'projects'>;

/**
 * Fetches the Open Graph image URL from a given website URL
 * @param url - The website URL to fetch the OG image from
 * @returns Promise<string | null> - The OG image URL or null if not found
 */
async function fetchOGImage(url: string): Promise<string | null> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      return null;
    }

    const html = await response.text();

    // Look for og:image meta tag
    const ogImageMatch =
      html.match(
        /<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["'][^>]*>/i
      ) ||
      html.match(
        /<meta[^>]*content=["']([^"']+)["'][^>]*property=["']og:image["'][^>]*>/i
      );

    if (ogImageMatch && ogImageMatch[1]) {
      let imageUrl = ogImageMatch[1];

      // Convert relative URLs to absolute URLs
      if (imageUrl.startsWith('/')) {
        const urlObj = new URL(url);
        imageUrl = `${urlObj.protocol}//${urlObj.host}${imageUrl}`;
      } else if (imageUrl.startsWith('./')) {
        const urlObj = new URL(url);
        imageUrl = `${urlObj.protocol}//${urlObj.host}${imageUrl.substring(1)}`;
      } else if (!imageUrl.startsWith('http')) {
        const urlObj = new URL(url);
        imageUrl = `${urlObj.protocol}//${urlObj.host}/${imageUrl}`;
      }

      return imageUrl;
    }

    // Fallback: look for twitter:image
    const twitterImageMatch =
      html.match(
        /<meta[^>]*name=["']twitter:image["'][^>]*content=["']([^"']+)["'][^>]*>/i
      ) ||
      html.match(
        /<meta[^>]*content=["']([^"']+)["'][^>]*name=["']twitter:image["'][^>]*>/i
      );

    if (twitterImageMatch && twitterImageMatch[1]) {
      let imageUrl = twitterImageMatch[1];

      // Convert relative URLs to absolute URLs
      if (imageUrl.startsWith('/')) {
        const urlObj = new URL(url);
        imageUrl = `${urlObj.protocol}//${urlObj.host}${imageUrl}`;
      } else if (!imageUrl.startsWith('http')) {
        const urlObj = new URL(url);
        imageUrl = `${urlObj.protocol}//${urlObj.host}/${imageUrl}`;
      }

      return imageUrl;
    }

    return null;
  } catch (error) {
    console.error(`Error fetching OG image for ${url}:`, error);
    return null;
  }
}

/**
 * Fetches OG images for multiple URLs in parallel
 * @param urls - Array of URLs to fetch OG images from
 * @returns Promise<Record<string, string | null>> - Object mapping URLs to their OG image URLs
 */
async function fetchMultipleOGImages(
  urls: string[]
): Promise<Record<string, string | null>> {
  const results = await Promise.allSettled(
    urls.map(async (url) => ({
      url,
      image: await fetchOGImage(url),
    }))
  );

  const imageMap: Record<string, string | null> = {};

  results.forEach((result) => {
    if (result.status === 'fulfilled') {
      imageMap[result.value.url] = result.value.image;
    }
  });

  return imageMap;
}

let ogImageCache: Record<string, string | null> | null = null;

/**
 * Pre-fetches and caches OG images for all projects with URLs
 * This ensures we only make API calls once across all pages
 */
export async function getProjectOGImages(): Promise<
  Record<string, string | null>
> {
  // Return cached results if available
  if (ogImageCache !== null) {
    return ogImageCache;
  }

  // Fetch all projects
  const projects = await getCollection('projects');

  // Extract unique URLs from all projects
  const projectUrls = projects
    .filter((project: Project) => project.data.url)
    .map((project: Project) => project.data.url as string);

  // Remove duplicates
  const uniqueUrls = [...new Set(projectUrls)];

  // Fetch OG images for all unique URLs
  ogImageCache = await fetchMultipleOGImages(uniqueUrls);

  return ogImageCache;
}

/**
 * Get cached OG images without refetching
 * Returns null if cache is not initialized yet
 */
export function getCachedOGImages(): Record<string, string | null> | null {
  return ogImageCache;
}

/**
 * Clear the cache (useful for development/testing)
 */
export function clearOGImageCache(): void {
  ogImageCache = null;
}
