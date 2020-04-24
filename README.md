# Tailwindcss-Vue

> Tailwindcss-Vue is a library of UI components for [Vue.js](https://vuejs.org/) built using the [Tailwind CSS](https://tailwindcss.com/) utility-first CSS framework.

[![Licence](https://img.shields.io/github/license/advanced-data-machines/tailwindcss-vue)](https://github.com/advanced-data-machines/tailwindcss-vue/blob/master/LICENSE)
[![NPM](https://img.shields.io/npm/v/@advanced-data-machines/tailwindcss-vue)](https://www.npmjs.com/package/@advanced-data-machines/tailwindcss-vue)

## Install

### npm
``` sh
npm install @advanced-data-machines/tailwindcss-vue
```

### yarn
``` sh
yarn add @advanced-data-machines/tailwindcss-vue
```

## Usage

``` js
import Vue from 'vue';
// styles for transitions and other base options
import '@advanced-data-machines/tailwindcss-vue/dist/tailwindcss-vue.css';
import TailwindcssVue from '@advanced-data-machines/tailwindcss-vue';

Vue.use(TailwindcssVue);
```

## Base Theme Expectations

Use of this project assumes you are using [PostCSS](https://postcss.org/) and Tailwind CSS in your Vue project.

#### *postcss.config.js*

``` js
// replace './tailwind.config.js' to your own config path
module.exports = {
	plugins: [
		require('tailwindcss')('./tailwind.config.js'),
		require('autoprefixer')
	]
};
```

#### *tailwind.config.js*

> This file is likely to change

``` js
const { colors } = require('tailwindcss/defaultTheme');
// variant defaults
// https://tailwindcss.com/docs/configuring-variants/#default-variants-reference
module.exports = {
	theme: {
		extend: {
			spacing: {
				'9': '2.25rem',
				'11': '2.75rem',
				'14': '3.5rem',
				'18': '4.5rem'
			},
			fontSize: {
				'xxs': '0.625rem'
			},
			stroke: {
				...colors
			},
			transitionDuration: {
				0: '0ms'
			},
			transitionDelay: {
				0: '0ms'
			}
		},
		container: {
			center: true
		}
	},
	variants: {
		borderColor: ['responsive', 'hover', 'focus', 'first', 'last', 'after'],
		borderRadius: ['responsive', 'first', 'last'],
		borderWidth: ['responsive', 'first', 'last'],
		margin: ['responsive', 'before', 'first', 'last'],
		textColor: ['responsive', 'hover', 'focus', 'before'],
		backgroundColor: ['responsive', 'hover', 'focus', 'before']
	},
	plugins: [
		function({ addVariant, e }) {
			addVariant('before', ({ modifySelectors, separator }) => {
				modifySelectors(({ className }) => {
					return `.${e(`before${separator}${className}`)}:before`;
				});
			});
		},
		function({ addVariant, e }) {
			addVariant('after', ({ modifySelectors, separator }) => {
				modifySelectors(({ className }) => {
					return `.${e(`after${separator}${className}`)}:after`;
				});
			});
		}
	]
};
```

## Developing/Running Locally 

Clone the repo to your computer then change to the project directory. Once in the root of the project, use the install command with your dependency manager of choice (yarn or npm).

``` sh
cd tailwindcss-vue
npm install
```
or

``` sh
cd tailwindcss-vue
yarn install
```

The project is set up with a Vue SPA playground to test components. In the root of the project directory you can run the development server with the *serve* command.

``` sh
npm run serve
```
or 

``` sh
yarn serve
```

You can also build the project and serve it to another local project using [npm link](https://docs.npmjs.com/cli/link) or the equivalent [yarn link](https://yarnpkg.com/lang/en/docs/cli/link/). While still in the root of the project directory, run the *build:bundle* command. 

``` sh 
npm run build:bundle
```
or

``` sh
yarn build:bundle
```

This will add the build to the *'dist'* folder as a consumable library. Once completed, run the *npm link* command.

``` sh 
npm link
```

Next, in the project you wish to link, run the *npm link tailwindcss-vue* in the same directory as the *package.json* file. This will add the project to the global scope to be referenced as a traditional installed npm package (import TailwindcssVue from '@advanced-data-machines/tailwindcss-vue').

``` sh 
npm link @advanced-data-machines/tailwindcss-vue
```

## Local Docs

This project is bundled with [VuePress](https://vuepress.vuejs.org/) to generate its documentation. You can run it locally by running the *docs:dev* run command. The docs are currently a work-in-progress.


``` sh 
npm run docs:dev
``` 
or

``` sh
yarn docs:dev
```
### More Coming Soon

## License

Code released under [MIT](https://github.com/advanced-data-machines/tailwindcss-vue/blob/master/LICENSE) license.

## Thanks to

Code based on, and inspiration from, [Buefy](https://buefy.org/) and [Element](https://element.eleme.io) component libraries.

Also, the theme concept is based on [Vue-Tailwind](https://vue-tailwind.com/) which is an alternative Tailwind CSS Vue component framework. 
