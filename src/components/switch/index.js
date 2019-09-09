import TvSwitch from './switch.vue';
import { installComponents } from '../../utils/plugins.js';

TvSwitch.install = function(Vue, args = {}) {
	installComponents(Vue, args, [this]);
};

export default TvSwitch;
