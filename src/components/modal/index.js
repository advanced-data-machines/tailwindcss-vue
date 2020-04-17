import Vue from 'vue';
import Modal from './modal.vue';
import { TvModal } from '../../themes/default';

import { installComponents, registerComponentProgrammatic } from '../../utils/plugins.js';

const ModalProgrammatic = function(params) {
	let content;
	let parent;
	if (typeof params === 'string') content = params;

	if (params.parent) {
		parent = params.parent;
		delete params.parent;
	}
	const propsData = Object.assign(typeof params === 'string' ? { content } : params, { programmatic: true });
	const vm = typeof window !== 'undefined' && window.Vue ? window.Vue : Vue;
	const ModalComponent = vm.extend(Modal);
	return new ModalComponent({
		parent,
		el: document.createElement('div'),
		propsData
	});
};

Modal.install = function(Vue, args = {}) {
	installComponents(Vue, args, this, TvModal);
	registerComponentProgrammatic(Vue, 'modal', ModalProgrammatic);
};

export default Modal;

export { ModalProgrammatic };
