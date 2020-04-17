import Radio from './radio.vue';
import { TvRadio } from '../../themes/default';

import { installComponents } from '../../utils/plugins.js';

Radio.install = function(Vue, args = {}) {
	installComponents(Vue, args, this, TvRadio);
};

export default Radio;
