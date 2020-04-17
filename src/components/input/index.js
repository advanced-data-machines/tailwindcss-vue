import Input from './input.vue';
import { TvInput } from '../../themes/default';

import { installComponents } from '../../utils/plugins.js';

Input.install = function(Vue, args = {}) {
	installComponents(Vue, args, this, TvInput);
};

export default Input;
