import TvCheckbox from './checkbox.vue';
import { installComponents } from '../../utils/plugins.js';

TvCheckbox.install = function(Vue, args = {}) {
	installComponents(Vue, args, [this]);
};

export default TvCheckbox;
