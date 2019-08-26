import Vue from 'vue';
import TvAlertNotice from '../alert/alert-notice.vue';
import { registerComponentProgrammatic } from '../../utils/plugins.js';

const AlertNotifyPogrammatic = function(params) {
	console.log('notify');
	let message;
	let parent;
	if (typeof params === 'string') message = params;

	if (params.parent) {
		parent = params.parent;
		delete params.parent;
	}
	const propsData = Object.assign({ message }, typeof params === 'string' ? {} : params);

	const vm = typeof window !== 'undefined' && window.Vue ? window.Vue : Vue;
	if (!vm.options.components['TvAlert']) {
		return;
	};
	const AlertNoticeComponent = vm.extend(TvAlertNotice);
	return new AlertNoticeComponent({
		parent,
		el: document.createElement('div'),
		propsData
	});
};

TvAlertNotice.install = function(Vue) {
	registerComponentProgrammatic(Vue, 'notify', AlertNotifyPogrammatic);
};

export default TvAlertNotice;

export { AlertNotifyPogrammatic };
