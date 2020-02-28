import TvPopper from './popper.vue';
import { useComponent } from '../../utils/plugins.js';

TvPopper.install = function(Vue) {
	useComponent(Vue, this);
};

export default TvPopper;
