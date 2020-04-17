import Label from './label.vue';
import { TvLabel } from '../../themes/default';

import { installComponents } from '../../utils/plugins.js';

Label.install = function(Vue, args = {}) {
	installComponents(Vue, args, this, TvLabel);
};

export default Label;
