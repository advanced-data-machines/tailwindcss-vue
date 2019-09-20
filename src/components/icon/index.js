import TvIcon from './icon.vue';
import { installComponents } from '../../utils/plugins.js';

TvIcon.install = function(Vue, args = {}) {
	installComponents(Vue, args, [this]);
};

export default TvIcon;
