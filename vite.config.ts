import { defineConfig } from 'vite-plus'

import lint from './oxlint.config'

export default defineConfig({
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

    }
  }
})
