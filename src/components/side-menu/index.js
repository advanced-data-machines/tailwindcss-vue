import SideMenu from './side-menu.vue';
import { TvSideMenu } from '../../themes/default';

import { installComponents } from '../../utils/plugins.js';

SideMenu.install = function(Vue, args = {}) {
	installComponents(Vue, args, this, TvSideMenu);
};

export default SideMenu;
