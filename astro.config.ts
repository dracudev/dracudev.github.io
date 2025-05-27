import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import flowbiteReact from "flowbite-react/plugin/astro";

export default defineConfig({
  output: "static",
  prefetch: true,
  compressHTML: true,

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [react(), flowbiteReact()],
});
