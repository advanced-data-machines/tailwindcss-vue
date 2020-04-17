import Select from './select.vue';
import { TvSelect } from '../../themes/default';

import { installComponents } from '../../utils/plugins.js';

Select.install = function(Vue, args = {}) {
	installComponents(Vue, args, this, TvSelect);
};

export default Select;
