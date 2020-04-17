import Alert from './alert.vue';
import { TvAlert } from '../../themes/default';

import { installComponents } from '../../utils/plugins.js';

Alert.install = function(Vue, args = {}) {
	installComponents(Vue, args, this, TvAlert);
};

export default Alert;
