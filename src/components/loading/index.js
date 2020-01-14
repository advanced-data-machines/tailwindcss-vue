import Vue from 'vue';
import TvLoading from './loading.vue';
import { installComponents, registerComponentProgrammatic } from '../../utils/plugins.js';

const LoadingProgrammatic = function(params) {
	const propsData = Object.assign(params, { programmatic: true });
	const vm = typeof window !== 'undefined' && window.Vue ? window.Vue : Vue;
	const LoadingComponent = vm.extend(TvLoading);
	return new LoadingComponent({
		el: document.createElement('div'),
		propsData
	});
};

TvLoading.install = function(Vue, args = {}) {
	installComponents(Vue, args, [this]);
	registerComponentProgrammatic(Vue, 'loading', LoadingProgrammatic);
};

export default TvLoading;
export { LoadingProgrammatic };
