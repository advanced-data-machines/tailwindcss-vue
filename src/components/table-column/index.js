import TvTableColumn from '../table/table-column.vue';
import { installComponents } from '../../utils/plugins.js';

TvTableColumn.install = function(Vue, args = {}) {
	installComponents(Vue, args, [this]);
};

export default TvTableColumn;
