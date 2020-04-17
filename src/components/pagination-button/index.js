import PaginationButton from '../pagination/pagination-button.vue';
import { TvPaginationButton } from '../../themes/default';

import { installComponents } from '../../utils/plugins.js';

PaginationButton.install = function(Vue, args = {}) {
	installComponents(Vue, args, this, TvPaginationButton);
};

export default PaginationButton;
