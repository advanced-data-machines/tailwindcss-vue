import Icon from './icon.vue';
import { TvIcon } from '../../themes/default';

import { installComponents } from '../../utils/plugins.js';

Icon.install = function(Vue, args = {}) {
	installComponents(Vue, args, this, TvIcon);
};

export default Icon;
