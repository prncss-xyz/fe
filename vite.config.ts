import { defineConfig } from 'vite-plus'

import { storybookTestProject } from './apps/web/vite.config'
import lint from './oxlint.config'

export default defineConfig({
	staged: {
		'*': 'vp check --fix',
	},
	fmt: {
		arrowParens: 'always',
		ignorePatterns: ['.*'],
		jsxSingleQuote: true,
		printWidth: 80,
		semi: false,
		singleQuote: true,
		sortImports: true,
		sortPackageJson: true,
		trailingComma: 'all',
		useTabs: true,
	},
	lint,
	run: {
		tasks: {
			verify: {
				command: 'true',
				dependsOn: ['tsc', 'test', 'knip', 'build'],
			},
			'verify:ci': {
				command: 'true',
				dependsOn: ['verify', 'check'],
			},
			'vp:test': {
				command: 'vp test',
				input: [{ auto: true }, '!node_modules/.cache/storybook/**'],
				output: [{ auto: true }, '!node_modules/.cache/storybook/**'],
			},
			'vp:test:changed': {
				command: 'vp test --changed',
				input: [{ auto: true }, '!node_modules/.cache/storybook/**'],
				output: [{ auto: true }, '!node_modules/.cache/storybook/**'],
			},
		},
	},
	test: {
		projects: [
			{
				extends: './apps/web/vite.config.ts',
				...storybookTestProject,
			},
		],
		coverage: {
			provider: 'v8',
			reporter: ['text', 'json'],
		},
		globals: true,
		passWithNoTests: true,
		pool: 'forks',
	},
})
