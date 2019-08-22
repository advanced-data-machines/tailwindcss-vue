import TvSideMenu from './side-menu.vue';
import { installComponents } from '../../utils/plugins.js';

TvSideMenu.install = function(Vue, args = {}) {
	installComponents(Vue, args, [this]);
};

export default TvSideMenu;
