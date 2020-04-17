import FormGroup from '../form/form-group.vue';
import { TvFormGroup } from '../../themes/default';

import { installComponents } from '../../utils/plugins.js';

FormGroup.install = function(Vue, args = {}) {
	installComponents(Vue, args, this, TvFormGroup);
};

export default FormGroup;
