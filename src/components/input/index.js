import TvInput from './input.vue';
import { installComponents } from '../../utils/plugins.js';

TvInput.install = function(Vue, args = {}) {
	installComponents(Vue, args, [this]);
};

export default TvInput;
