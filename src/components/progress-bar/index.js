import TvProgress from './progress.vue';
import { installComponents } from '../../utils/plugins.js';

TvProgress.install = function(Vue, args = {}) {
	installComponents(Vue, args, [this]);
};

export default TvProgress;
