import { defineMain } from '@storybook/react-vite/node'

export default defineMain({
	stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
	addons: ['@storybook/addon-a11y', '@storybook/addon-docs'],
	framework: {
		name: '@storybook/react-vite',
		options: {},
	},
	core: {
		builder: {
			name: '@storybook/builder-vite',
			options: {
				viteConfigPath: '.storybook/vite.config.ts',
			},
		},
	},
})
