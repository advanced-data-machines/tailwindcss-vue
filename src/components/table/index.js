import Table from './table.vue';
import { TvTable } from '../../themes/default';

import { installComponents } from '../../utils/plugins.js';

Table.install = function(Vue, args = {}) {
	installComponents(Vue, args, this, TvTable);
};

export default Table;
