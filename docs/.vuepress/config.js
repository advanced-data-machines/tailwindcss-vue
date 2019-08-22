module.exports = {
	title: 'Tailwindcss-Vue',
	description: 'Just playing around',
	postcss: {
		'plugins': [
		  require('tailwindcss')('tailwind.config.js'),
		  require('autoprefixer')()
		]
	}
};