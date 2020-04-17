import Form from './form.vue';
import { TvForm } from '../../themes/default';

import { installComponents } from '../../utils/plugins.js';

Form.install = function(Vue, args = {}) {
	installComponents(Vue, args, this, TvForm);
};

export default Form;
