import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	base: "https://eurydia.github.io/project-dsp-calculator/",

	plugins: [react()],
	build: {
		target: "esnext",
		sourcemap: true,
	},
});
