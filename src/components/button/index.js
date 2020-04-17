import Button from './button.vue';
import { TvButton } from '../../themes/default';
import { installComponents } from '../../utils/plugins.js';

Button.install = function(Vue, args = {}) {
	installComponents(Vue, args, this, TvButton);
};

export default Button;
