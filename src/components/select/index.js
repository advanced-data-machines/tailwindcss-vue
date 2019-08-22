import TvSelect from './select.vue';
import { installComponents } from '../../utils/plugins.js';

TvSelect.install = function(Vue, args = {}) {
	installComponents(Vue, args, [this]);
};

export default TvSelect;
