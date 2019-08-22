import TvFormGroup from '../form/form-group.vue';
import { installComponents } from '../../utils/plugins.js';

TvFormGroup.install = function(Vue, args = {}) {
	installComponents(Vue, args, [this]);
};

export default TvFormGroup;
