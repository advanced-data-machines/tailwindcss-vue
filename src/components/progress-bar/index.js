import ProgressBar from './progress-bar.vue';
import { TvProgressBar } from '../../themes/default';

import { installComponents } from '../../utils/plugins.js';

ProgressBar.install = function(Vue, args = {}) {
	installComponents(Vue, args, this, TvProgressBar);
};

export default ProgressBar;
