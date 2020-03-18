import TvAutocompleteItem from '../autocomplete/autocomplete-item.vue';
import { installComponents } from '../../utils/plugins.js';

TvAutocompleteItem.install = function(Vue, args = {}) {
	installComponents(Vue, args, [this]);
};

export default TvAutocompleteItem;