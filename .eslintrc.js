module.exports = {
	root: true,
	env: {
		node: true
	},
	'extends': [
		'plugin:vue/strongly-recommended',
		'@vue/standard'
	],
	rules: {
		'no-var': 2,
		'indent': ['error', 'tab'],
		'no-tabs': 0,
		'semi': [
			'error',
			'always'
		],
		'quotes': [
			'error',
			'single'
		],
		'space-before-function-paren': ['error', 'never'],
		'no-console': process.env.NODE_ENV === 'production' ? ['error', { allow: ['warn', 'error'] }] : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'vue/component-name-in-template-casing': ['error', 'PascalCase'],
		'vue/html-indent': [
			'error',
			'tab'
		],
		'vue/max-attributes-per-line': 'off',
		'vue/singleline-html-element-content-newline': 'off'
	},
	parserOptions: {
		parser: 'babel-eslint'
	}
};
