import TvDropdown from './dropdown.vue';
import { installComponents } from '../../utils/plugins.js';

TvDropdown.install = function(Vue, args = {}) {
	installComponents(Vue, args, [this]);
};

export default TvDropdown;
