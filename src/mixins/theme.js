import Theme from '../utils/theme.js';
import { isEmpty, objectAssign } from '../utils/utils.js';
export default {
	props: {
		themeOverride: {
			type: Object,
			default: () => {}
		}
	},
	data() {
		return {
			theme: Theme[this.$options.name]
		};
	},
	computed: {
		currentTheme() {
			return isEmpty(this.themeOverride) ? this.theme : objectAssign({}, this.theme, this.themeOverride);
		}
	}
};
