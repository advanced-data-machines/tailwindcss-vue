import Popper from './popper.vue';

import { useComponent } from '../../utils/plugins.js';

Popper.install = function(Vue) {
	useComponent(Vue, this);
};

export default Popper;
