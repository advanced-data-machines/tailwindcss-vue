import SideSubmenu from '../side-menu/side-submenu.vue';
import { TvSideSubmenu } from '../../themes/default';

import { installComponents } from '../../utils/plugins.js';

SideSubmenu.install = function(Vue, args = {}) {
	installComponents(Vue, args, this, TvSideSubmenu);
};

export default SideSubmenu;
