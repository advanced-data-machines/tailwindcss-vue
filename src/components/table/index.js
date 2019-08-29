import TvTable from './table.vue';
import { installComponents } from '../../utils/plugins.js';

TvTable.install = function(Vue, args = {}) {
	installComponents(Vue, args, [this]);
};

export default TvTable;
