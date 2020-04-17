import DropdownItem from '../dropdown/dropdown-item.vue';
import { TvDropdownItem } from '../../themes/default';

import { installComponents } from '../../utils/plugins.js';

DropdownItem.install = function(Vue, args = {}) {
	installComponents(Vue, args, this, TvDropdownItem);
};

export default DropdownItem;
