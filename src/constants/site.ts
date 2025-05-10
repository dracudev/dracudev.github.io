export type NavigationItem = {
  name: string;
  path: string;
};

export const SITE = {
  name: "dracudev",
  title: "Frontend Developer | Digital Marketer",
  description: "Personal portfolio",
  url: "https://dracu.dev",
  defaultImage: "/default-og-image.jpg", //TODO: add default image
} as const;

export const NAVIGATION: {
  main: NavigationItem[];
} = {
  main: [
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: "Experience", path: "/experience" },
    { name: "Education", path: "/education" },
  ],
} as const;

export const META = {
  openGraph: {
    type: "website",
    locale: "en_US",
  },
  twitter: {
    cardType: "summary_large_image",
  },
} as const;
