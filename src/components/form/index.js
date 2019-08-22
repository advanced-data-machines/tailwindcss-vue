import TvForm from './form.vue';
import { installComponents } from '../../utils/plugins.js';

TvForm.install = function(Vue, args = {}) {
	installComponents(Vue, args, [this]);
};

export default TvForm;
