import TvCheckboxButton from '../checkbox/checkbox-button.vue';
import { installComponents } from '../../utils/plugins.js';

TvCheckboxButton.install = function(Vue, args = {}) {
	installComponents(Vue, args, [this]);
};

export default TvCheckboxButton;
