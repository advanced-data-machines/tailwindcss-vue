import TvAlert from './alert.vue';
import { installComponents } from '../../utils/plugins.js';

TvAlert.install = function(Vue, args = {}) {
	installComponents(Vue, args, [this]);
};

export default TvAlert;
