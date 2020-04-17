import SideMenuItem from '../side-menu/side-menu-item.vue';
import { TvSideMenuItem } from '../../themes/default';

import { installComponents } from '../../utils/plugins.js';

SideMenuItem.install = function(Vue, args = {}) {
	installComponents(Vue, args, this, TvSideMenuItem);
};

export default SideMenuItem;
