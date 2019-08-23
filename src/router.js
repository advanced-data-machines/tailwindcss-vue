import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/home.vue';
import BaseRoute from './views/base-route.vue';
import Form from './views/form.vue';

Vue.use(Router);

export default new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [
		{
			path: '/',
			name: 'home',
			component: Home,
			meta: {
				index: 'TD',
				title: 'Home',
				icon: 'mdi-view-dashboard'
			}
		},
		{
			path: '/Components',
			name: 'components',
			component: BaseRoute,
			meta: {
				index: 'C',
				title: 'Components',
				icon: 'mdi-lock'
			},
			children: [
				{
					path: 'Form',
					name: 'form',
					component: Form,
					meta: {
						index: 'C-1',
						title: 'Form'
					}
				}
			]
		}
	]
});
