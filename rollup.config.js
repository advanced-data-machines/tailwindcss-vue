import vue from 'rollup-plugin-vue';
import node from '@rollup/plugin-node-resolve';
import cjs from '@rollup/plugin-commonjs';
import babel from 'rollup-plugin-babel';
import postcss from 'rollup-plugin-postcss';
import { terser } from 'rollup-plugin-terser';
import del from 'rollup-plugin-delete';

import fs from 'fs';
import path from 'path';

import pack from './package.json';

const babelConfig = {
	exclude: 'node_modules/**',
	runtimeHelpers: true,
	babelrc: false,
	presets: [['@babel/preset-env', { modules: false }]]
};

const bannerTxt = `/*! Tailwindcss-Vue v${pack.version} | MIT License | https://github.com/advanced-data-machines/tailwindcss-vue */`;

const baseFolder = './src/';
const componentsFolder = 'components/';
const cssAssetsFolder = 'assets/css/';
const pkgName = 'tailwindcss-vue';

const components = fs
	.readdirSync(baseFolder + componentsFolder)
	.filter((f) =>
		fs.statSync(path.join(baseFolder + componentsFolder, f)).isDirectory()
	);

const cssComponents = fs.readdirSync(baseFolder + cssAssetsFolder + componentsFolder);

const entries = {
	'index': './src/index.js',
	...components.reduce((obj, name) => {
		obj[name] = (baseFolder + componentsFolder + name);
		return obj;
	}, {})
};

const capitalize = (s) => {
	if (typeof s !== 'string') return '';
	return s.charAt(0).toUpperCase() + s.slice(1);
};

export default () => {
	const mapComponent = (name) => {
		const input = [
			{
				input: baseFolder + componentsFolder + `${name}/index.js`,
				external: ['vue'],
				output: {
					format: 'umd',
					name: capitalize(name),
					file: `dist/components/${name}/index.js`,
					banner: bannerTxt,
					exports: 'named',
					globals: {
						vue: 'Vue'
					}
				},
				plugins: [
					node({
						extensions: ['.vue', '.js']
					}),
					vue({
						template: {
							isProduction: true
						}
					}),
					babel(babelConfig),
					cjs()
				]
			}
		];
		const match = cssComponents.find(n => {
			const split = n.split('.');
			return split[0] === name;
		});
		if (typeof match !== 'undefined') {
			input.push({
				input: baseFolder + cssAssetsFolder + componentsFolder + `${name}.css`,
				output: {
					file: `dist/components/${name}/${name}.css`,
					banner: bannerTxt
				},
				plugins: [
					postcss({
						extract: true,
						plugins: [
							require('postcss-import'),
							require('autoprefixer')
						]
					})
				]
			});
		}
		return input;
	};

	let config = [
		{
			input: baseFolder + cssAssetsFolder + pkgName + '.css',
			output: {
				dir: 'dist'
			},
			plugins: [
				del({ targets: 'dist/*' }),
				postcss({
					extract: true,
					plugins: [
						require('postcss-import'),
						require('autoprefixer')
					]
				})
			]
		},
		{
			input: entries,
			external: ['vue'],
			output: {
				format: 'esm',
				dir: 'dist/esm'
			},
			plugins: [
				node({
					extensions: ['.vue', '.js']
				}),
				vue({
					template: {
						isProduction: true
					}
				}),
				babel(babelConfig),
				cjs()
			]
		},
		{
			input: entries,
			external: ['vue'],
			output: {
				format: 'cjs',
				dir: 'dist/cjs',
				exports: 'named'
			},
			plugins: [
				node({
					extensions: ['.vue', '.js']
				}),
				vue({
					template: {
						isProduction: true
					}
				}),
				babel(babelConfig),
				cjs()
			]
		},
		{
			input: 'src/index.js',
			external: ['vue'],
			output: {
				format: 'umd',
				name: capitalize('tailwindcss-vue'),
				file: 'dist/tailwindcss-vue.js',
				exports: 'named',
				banner: bannerTxt,
				globals: {
					vue: 'Vue'
				}
			},
			plugins: [
				node({
					extensions: ['.vue', '.js']
				}),
				vue({
					template: {
						isProduction: true
					}
				}),
				babel(babelConfig),
				cjs()
			]
		},
		{
			input: 'src/index.js',
			external: ['vue'],
			output: {
				format: 'esm',
				file: 'dist/tailwindcss-vue.esm.js',
				banner: bannerTxt
			},
			plugins: [
				node({
					extensions: ['.vue', '.js']
				}),
				vue({
					template: {
						isProduction: true
					}
				}),
				babel(babelConfig),
				cjs()
			]
		},
		// individual components
		...components.map((f) => mapComponent(f)).reduce((r, a) => r.concat(a), [])
	];

	if (process.env.MINIFY === 'true') {
		config = config.filter((c) => !!c.output.file);
		config.forEach((c) => {
			c.output.file = c.output.file.replace(/\.js/g, '.min.js');
			c.plugins.push(terser({
				output: {
					comments: '/^!/'
				}
			}));
		});
	}
	return config;
};
