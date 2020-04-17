import Dropdown from './dropdown.vue';
import { TvDropdown } from '../../themes/default';
import { installComponents } from '../../utils/plugins.js';

Dropdown.install = function(Vue, args = {}) {
	installComponents(Vue, args, this, TvDropdown);
};

export default Dropdown;
