import Resizable from './resizable.vue';
// import { TvResizable } from '../../themes/default';

import { installComponents } from '../../utils/plugins.js';

Resizable.install = function(Vue, args = {}) {
	installComponents(Vue, args, this, {});
};

export default Resizable;
