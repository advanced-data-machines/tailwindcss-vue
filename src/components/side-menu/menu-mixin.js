import ThemeMixin from '../../mixins/theme.js';
export default {
	mixins: [ThemeMixin],
	inject: ['rootMenu'],
	computed: {
		indexPath() {
			const path = [this.index];
			let parent = this.$parent;
			while (parent.$options.name !== 'TvSideMenu') {
				if (parent.index) {
					path.unshift(parent.index);
				}
				parent = parent.$parent;
			}
			return path;
		},
		parentMenu() {
			let parent = this.$parent;
			while (parent && ['TvSideMenu', 'TvSideSubMenu'].indexOf(parent.$options.name) === -1) {
				parent = parent.$parent;
			}
			return parent;
		},
		currentClass() {
			const tag = this.className;
			const theme = this.currentTheme;
			let state = this.active ? 'active' : 'default';
			if (this.disabled) {
				state = 'disabled';
			}
			return [
				tag,
				`is-${state}`,
				theme.base,
				theme.state[state]
			];
		}
	}
};
