import TvAutocomplete from './autocomplete.vue';
import { installComponents } from '../../utils/plugins.js';

TvAutocomplete.install = function(Vue, args = {}) {
	installComponents(Vue, args, [this]);
};

export default TvAutocomplete;