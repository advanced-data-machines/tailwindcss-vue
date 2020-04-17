import Vue from 'vue';
import AlertNotice from '../alert/alert-notice.vue';
import { TvAlertNotice } from '../../themes/default';
import { setComponentTheme, registerComponentProgrammatic } from '../../utils/plugins.js';

const NotifyProgrammatic = function(params) {
	let message;
	let parent;
	if (typeof params === 'string') message = params;

	if (params.parent) {
		parent = params.parent;
		delete params.parent;
	}
	// don't let inner alert auto close
	const propsData = Object.assign({ message, position: 'top-right' }, typeof params === 'string' ? {} : params, { autoClose: false });
	const vm = typeof window !== 'undefined' && window.Vue ? window.Vue : Vue;
	const AlertNoticeComponent = vm.extend(AlertNotice);
	return new AlertNoticeComponent({
		parent,
		el: document.createElement('div'),
		propsData
	});
};

AlertNotice.install = function(Vue, args = {}) {
	setComponentTheme(Vue, args, this.name, TvAlertNotice);
	registerComponentProgrammatic(Vue, 'notify', NotifyProgrammatic);
};

export default AlertNotice;

export { NotifyProgrammatic };
