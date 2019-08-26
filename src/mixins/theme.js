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
			theme: this.$tailwindVue.theme
		};
	},
	computed: {
		currentTheme() {
			const theme = this.theme[this.$options.name];
			return isEmpty(this.themeOverride) ? theme : objectAssign({}, theme, this.themeOverride);
		}
	}
};
