import react from "@vitejs/plugin-react";
import {
	defineConfig,
	splitVendorChunkPlugin,
} from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
	base: "/project-dsp-calculator/",
	plugins: [
		react(),
		splitVendorChunkPlugin(),
		tsconfigPaths(),
	],
	build: {
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
