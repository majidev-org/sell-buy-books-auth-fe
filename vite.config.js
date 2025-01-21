import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
	plugins: [
		react(),
		federation({
			name: "Auth",
			filename: "remoteEntry.js",
			exposes: {
				// "./App": "./src/App",
				"./Login": "./src/components/LoginPage.jsx",
				"./SignUp": "./src/components/SignupPage.jsx"
			},
			shared: ["react", "react-dom"]
		})
	],
	build: {
		modulePreload: false,
		target: "esnext",
		minify: false,
		cssCodeSplit: false
	},
	preview: {
		port: 5174,
		strictPort: true,
		cors: true
	}
});
