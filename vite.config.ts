import { defineConfig } from 'vite-plus'

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
	test: {
		coverage: {
			provider: 'v8',
			reporter: ['text', 'json'],
		},
		globals: true,
		passWithNoTests: true,
		pool: 'forks',
	},
})
