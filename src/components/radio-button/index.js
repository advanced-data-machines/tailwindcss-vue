import TvRadioButton from './radio-button.vue';
import { installComponents } from '../../utils/plugins.js';

TvRadioButton.install = function(Vue, args = {}) {
	installComponents(Vue, args, [this]);
};

export default TvRadioButton;
