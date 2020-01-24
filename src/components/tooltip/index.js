import TvTooltip from './tooltip.vue';
import { installComponents } from '../../utils/plugins.js';

TvTooltip.install = function(Vue, args = {}) {
	installComponents(Vue, args, [this]);
};

export default TvTooltip;
