import TvCollapseTransition from './collapse-transition.vue';
import { useComponent } from '../../utils/plugins.js';

TvCollapseTransition.install = function(Vue) {
	useComponent(Vue, this);
};

export default TvCollapseTransition;
