import CheckboxButton from './checkbox-button.vue';
import { TvCheckboxButton } from '../../themes/default';
import { installComponents } from '../../utils/plugins.js';

CheckboxButton.install = function(Vue, args = {}) {
	installComponents(Vue, args, this, TvCheckboxButton);
};

export default CheckboxButton;
