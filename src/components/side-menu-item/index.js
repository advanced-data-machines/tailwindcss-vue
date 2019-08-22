import TvSideMenuItem from '../side-menu/side-menu-item.vue';
import { installComponents } from '../../utils/plugins.js';

TvSideMenuItem.install = function(Vue, args = {}) {
	installComponents(Vue, args, [this]);
};

export default TvSideMenuItem;
