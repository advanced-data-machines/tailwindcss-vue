import TvButton from './button.vue';
import { installComponents } from '../../utils/plugins.js';

TvButton.install = function(Vue, args = {}) {
	installComponents(Vue, args, [this]);
};

export default TvButton;
