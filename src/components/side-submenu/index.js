import TvSubSideMenu from '../side-menu/side-submenu.vue';
import { installComponents } from '../../utils/plugins.js';

TvSubSideMenu.install = function(Vue, args = {}) {
	installComponents(Vue, args, [this]);
};

export default TvSubSideMenu;
