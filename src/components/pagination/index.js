import Pagination from './pagination.vue';
import { TvPagination } from '../../themes/default';

import { installComponents } from '../../utils/plugins.js';

Pagination.install = function(Vue, args = {}) {
	installComponents(Vue, args, this, TvPagination);
};

export default Pagination;
