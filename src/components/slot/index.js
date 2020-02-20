import TvSlotComponent from './slot-component.js';
import { useComponent } from '../../utils/plugins.js';

TvSlotComponent.install = function(Vue, args = {}) {
	useComponent(Vue, this);
};

export default TvSlotComponent;
