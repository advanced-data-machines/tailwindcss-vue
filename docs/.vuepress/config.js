module.exports = {
	title: 'Tailwindcss-Vue',
	description: 'Just playing around',
	themeConfig: {
		nav: [
			{ text: 'Home', link: '/' },
			{ text: 'Github', link: 'https://github.com/jgraham44/tailwindcss-vue' },
		],
		sidebar: [
		'/',
		{
			title: 'Getting Started',
			collapsable: false,
			children: [
				'/getting-started/install',
			]
		},
		{
			title: 'Components',
			collapsable: false,
			children: [
				'/components/button',
			]
		}
		]
	},
	postcss: {
		'plugins': [
		require('tailwindcss')('tailwind.config.js'),
		require('autoprefixer')()
		]
	}
};