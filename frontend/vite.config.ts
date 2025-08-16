import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

/**
 * Vite configuration for the SvelteKit frontend
 * This configuration sets up the dev server
 * and proxies API requests to the Node backend
 */
export default defineConfig({
	plugins: [sveltekit()],
	server: {
		port: 5173,
		proxy: {
			// forward /api/* to Node backend on 3000
			'/api': {
				target: 'http://localhost:3000',
				changeOrigin: true
			}
		}
	}
});
