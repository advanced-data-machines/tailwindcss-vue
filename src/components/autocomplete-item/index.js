import AutocompleteItem from '../autocomplete/autocomplete-item.vue';
import { TvAutocompleteItem } from '../../themes/default';
import { installComponents } from '../../utils/plugins.js';

AutocompleteItem.install = function(Vue, args = {}) {
	installComponents(Vue, args, this, TvAutocompleteItem);
};

export default AutocompleteItem;
