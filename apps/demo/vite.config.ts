import { paraglideVitePlugin } from '@inlang/paraglide-js'
import babel from '@rolldown/plugin-babel'
import { devtools } from '@tanstack/devtools-vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact, { reactCompilerPreset } from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { lazyPlugins } from 'vite-plus'

const config = defineConfig({
	resolve: { tsconfigPaths: true },
	plugins: lazyPlugins(() => [
		devtools(),
		paraglideVitePlugin({
			project: './project.inlang',
			outdir: './src/paraglide',
			strategy: ['url', 'baseLocale'],
		}),
		tanstackStart(),
		viteReact(),
		babel({ presets: [reactCompilerPreset()] }),
	]),
})

export default config
