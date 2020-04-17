import Vue from 'vue';
import Loading from './loading.vue';
import { TvLoading } from '../../themes/default';

import { installComponents, registerComponentProgrammatic } from '../../utils/plugins.js';

const LoadingProgrammatic = function(params) {
	const propsData = Object.assign(params, { programmatic: true });
	const vm = typeof window !== 'undefined' && window.Vue ? window.Vue : Vue;
	const LoadingComponent = vm.extend(Loading);
	return new LoadingComponent({
		el: document.createElement('div'),
		propsData
	});
};

Loading.install = function(Vue, args = {}) {
	installComponents(Vue, args, this, TvLoading);
	registerComponentProgrammatic(Vue, 'loading', LoadingProgrammatic);
};

export default Loading;
export { LoadingProgrammatic };
