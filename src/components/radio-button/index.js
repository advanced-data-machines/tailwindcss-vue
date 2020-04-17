import RadioButton from './radio-button.vue';
import { TvRadioButton } from '../../themes/default';

import { installComponents } from '../../utils/plugins.js';

RadioButton.install = function(Vue, args = {}) {
	installComponents(Vue, args, this, TvRadioButton);
};

export default RadioButton;
