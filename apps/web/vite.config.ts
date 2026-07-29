import { existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

import babel from '@rolldown/plugin-babel'
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin'
import { devtools } from '@tanstack/devtools-vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact, { reactCompilerPreset } from '@vitejs/plugin-react'
import { playwright } from '@vitest/browser-playwright'
import { defineConfig, lazyPlugins } from 'vite-plus'

const config = defineConfig({
	resolve: { tsconfigPaths: true },
	plugins: lazyPlugins(() => [
		devtools(),
		tanstackStart(),
		viteReact(),
		babel({ presets: [reactCompilerPreset()] }),
	]),
	run: {
		tasks: {
			vpTsc: 'tsc --noEmit',
		},
	},
	test: {
		projects: [
			{
				extends: true,
				plugins: [
					storybookTest({
						configDir: fileURLToPath(new URL('./.storybook', import.meta.url)),
						storybookScript: 'pnpm storybook --no-open',
					}),
				],
				test: {
					name: 'storybook',
					browser: {
						enabled: true,
						headless: true,
						instances: [{ browser: 'chromium' }],
						provider: playwright({
							launchOptions: {
								executablePath: existsSync('/usr/bin/chromium')
									? '/usr/bin/chromium'
									: undefined,
							},
						}),
					},
				},
			},
		],
	},
})

export default config
