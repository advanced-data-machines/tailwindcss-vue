import TvTableHeader from '../table/table-header.vue';
import { installComponents } from '../../utils/plugins.js';

TvTableHeader.install = function(Vue, args = {}) {
	installComponents(Vue, args, [this]);
};

export default TvTableHeader;
