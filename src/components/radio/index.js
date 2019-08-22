import TvRadio from './radio.vue';
import { installComponents } from '../../utils/plugins.js';

TvRadio.install = function(Vue, args = {}) {
	installComponents(Vue, args, [this]);
};

export default TvRadio;
