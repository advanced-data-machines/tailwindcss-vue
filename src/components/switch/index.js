import Switch from './switch.vue';
import { TvSwitch } from '../../themes/default';
import { installComponents } from '../../utils/plugins.js';

Switch.install = function(Vue, args = {}) {
	installComponents(Vue, args, this, TvSwitch);
};

export default Switch;
