import TvDropdownItem from '../dropdown/dropdown-item.vue';
import { installComponents } from '../../utils/plugins.js';

TvDropdownItem.install = function(Vue, args = {}) {
	installComponents(Vue, args, [this]);
};

export default TvDropdownItem;
