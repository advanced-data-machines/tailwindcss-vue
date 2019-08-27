import Vue from 'vue';
import TvAlertNotice from '../alert/alert-notice.vue';
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
	if (!vm.options.components['TvAlert']) {
		console.warn('(TV Warn[TvAlertNotive]) - the \'TvAlert\' component is requried for notify to work');
		return;
	};
	const AlertNoticeComponent = vm.extend(TvAlertNotice);
	return new AlertNoticeComponent({
		parent,
		el: document.createElement('div'),
		propsData
	});
};

TvAlertNotice.install = function(Vue, args = {}) {
	setComponentTheme(Vue, args, this.name);
	registerComponentProgrammatic(Vue, 'notify', NotifyProgrammatic);
};

export default TvAlertNotice;

export { NotifyProgrammatic };
