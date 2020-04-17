import Tooltip from './tooltip.vue';
import { TvTooltip } from '../../themes/default';

import { installComponents } from '../../utils/plugins.js';

Tooltip.install = function(Vue, args = {}) {
	installComponents(Vue, args, this, TvTooltip);
};

export default Tooltip;
