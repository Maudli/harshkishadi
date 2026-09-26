import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import netlify from "@netlify/vite-plugin-tanstack-start";

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },

  // Disable Lovable's default Cloudflare Nitro deployment.
  nitro: false,

  // Add Netlify's TanStack Start integration.
  vite: {
    plugins: [netlify()],
  },
});