import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/project-dsp-calculator/",
  plugins: [react(), tsconfigPaths()],

  build: {
    rollupOptions: {
      treeshake: true,
      output: {
        minifyInternalExports: true,
        manualChunks: (id) => {
          if (id.includes("node_modules")) {
            if (
              id.includes("@mui") ||
              id.includes("@emotion")
            ) {
              return "vendor_mui";
            }
            if (id.includes("react")) {
              return "vendor_react";
            }
            return "vendor";
          }
        },
      },
    },
  },
});
