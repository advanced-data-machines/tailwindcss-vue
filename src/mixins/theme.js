import { isEmpty, objectAssign } from '../utils/utils.js';
import Theme from '../utils/theme.js';
export default {
	props: {
		themeOverride: {
			type: Object,
			default: () => {}
		}
	},
	data() {
		return {
			theme: Theme
		};
	},
	computed: {
		currentTheme() {
			const theme = this.theme[this.$options.name];
			return isEmpty(this.themeOverride) ? theme : objectAssign({}, theme, this.themeOverride);
		}
	}
};
