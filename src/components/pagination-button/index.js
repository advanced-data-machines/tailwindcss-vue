import TvPaginationButton from '../pagination/pagination-button.vue';
import { installComponents } from '../../utils/plugins.js';

TvPaginationButton.install = function(Vue, args = {}) {
	installComponents(Vue, args, [this]);
};

export default TvPaginationButton;
