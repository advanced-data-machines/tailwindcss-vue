import Vue from 'vue';
import App from './App.vue';
import router from './router';
import '@mdi/font/css/materialdesignicons.css';
import '@/assets/css/tailwind.css';
import '@/assets/css/tailwindcss-vue.css';
// plugin
// import Button from './components/button/index.js';
import Twv from './index.js';
// root component
Vue.config.productionTip = false;
const custom = {
	theme: {
		TvForm: {
			base: 'text-gray-300'
		},
		TvFormGroup: {
			base: 'w-full mb-8'
		},
		TvPaginationButton: {
			base: 'appearance-none whitespace-no-wrap inline-block rounded text-center shadow focus:outline-none border align-baseline leading-tight mr-1 last:mr-0'
		}
	}
};
Vue.use(Twv, custom);
new Vue({
	router,
	render: h => h(App)
}).$mount('#app');
