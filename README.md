# Tailwindcss-Vue

> Tailwindcss-Vue is a library of UI components for [Vue.js](https://vuejs.org/) built using the [Tailwind CSS](https://tailwindcss.com/) utility-first CSS framework.

## Developing locally 

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

You can also build the project and serve it to another local project using **npm link**. While still in the root of the project directory, run the *build:bundle* command.

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

Next, in the project you wish to link, run the *npm link tailwindcss-vue* in the same directory as the *package.json* file. This will add the project to the global scope to be referenced as a traditional installed npm package (import TailwindcssVue from 'tailwindcss-vue').

``` sh 
npm link tailwindcss-vue
```

## Local Doc

This project is bundled with [VuePress](https://vuepress.vuejs.org/) to generate its documentation. You can run it locally by running the *docs:dev* run command. The docs are currently a work-in-progress.


``` sh 
npm run docs:dev
``` 
or

``` sh
yarn docs:dev
```
### Coming Soon

## License

Code released under [MIT](https://github.com/jgraham44/tailwindcss-vue/blob/master/LICENSE) license.

## Thanks to

Code based on, and inspiration from, [Buefy](https://buefy.org/) and [Element](https://element.eleme.io) component libraries.

Also, the theme concept is based on [Vue-Tailwind](https://vue-tailwind.com/) which is an alternative Tailwind CSS Vue component framework. 
