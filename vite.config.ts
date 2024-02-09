import {
	defineConfig,
	splitVendorChunkPlugin,
} from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
	base: "https://eurydia.github.io/project-dsp-calculator/",
	plugins: [
		react(),
		splitVendorChunkPlugin(),
		tsconfigPaths(),
	],
	build: {
		target: "es2020",
		sourcemap: true,
		minify: true,
		cssMinify: "esbuild",
		commonjsOptions: {
			strictRequires: true,
		},
		rollupOptions: {
			output: {
				minifyInternalExports: true,
				manualChunks: (id) => {
					if (id.includes("node_module")) {
						return id
							.toString()
							.split("node_modules/")[1]
							.split("/")[0]
							.toString();
					}
				},
			},
		},
	},
});
