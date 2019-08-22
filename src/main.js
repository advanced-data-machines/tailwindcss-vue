import Vue from 'vue';
import App from './App.vue';
import router from './router';
import '@mdi/font/css/materialdesignicons.css';
import '@/assets/css/tailwind.css';
// plugin
// import Button from './components/button/index.js';
import Twv from './index.js';
// root component
Vue.config.productionTip = false;

Vue.use(Twv);
new Vue({
	router,
	render: h => h(App)
}).$mount('#app');
