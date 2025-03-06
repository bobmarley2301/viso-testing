import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	build: {
		outDir: 'dist',
		sourcemap: true,
		minify: 'terser',
		terserOptions: {
			compress: {
				drop_console: true,
				drop_debugger: true,
			},
		},
		rollupOptions: {
			output: {
				manualChunks: {
					vendor: [
						'react',
						'react-dom',
						'@chakra-ui/react',
						'@tanstack/react-router',
						'@tanstack/react-query',
						'axios',
						'zustand',
					],
					ui: [
						'@chakra-ui/icons',
						'@emotion/react',
						'@emotion/styled',
						'framer-motion',
					],
				},
			},
		},
		chunkSizeWarningLimit: 1000,
		assetsInlineLimit: 4096,
	},
	server: {
		port: 3000,
		open: true,
	},
})
