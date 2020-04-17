import Autocomplete from './autocomplete.vue';
import { TvAutocomplete } from '../../themes/default';
import { installComponents } from '../../utils/plugins.js';

Autocomplete.install = function(Vue, args = {}) {
	installComponents(Vue, args, this, TvAutocomplete);
};

export default Autocomplete;
