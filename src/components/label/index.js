import TvLabel from './label.vue';
import { installComponents } from '../../utils/plugins.js';

TvLabel.install = function(Vue, args = {}) {
	installComponents(Vue, args, [this]);
};

export default TvLabel;
