import Checkbox from './checkbox.vue';
import { TvCheckbox } from '../../themes/default';
import { installComponents } from '../../utils/plugins.js';

Checkbox.install = function(Vue, args = {}) {
	installComponents(Vue, args, this, TvCheckbox);
};

export default Checkbox;
