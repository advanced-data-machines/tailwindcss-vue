import TvPopper from './popper.vue';
import { useComponent } from '../../utils/plugins.js';

TvPopper.install = function(Vue, args = {}) {
	useComponent(Vue, this);
};

export default TvPopper;
