import TvPagination from './pagination-button.vue';
import { installComponents } from '../../utils/plugins.js';

TvPagination.install = function(Vue, args = {}) {
	installComponents(Vue, args, [this]);
};

export default TvPagination;
