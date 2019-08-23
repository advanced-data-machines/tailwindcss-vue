export default {
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
			const tag = this.$options._componentTag;
			const theme = this.$tvTheme[this.$options.name];
			if (!theme) {
				console.warn('(TV Warn[Theme -TvSideMenuItem]) - theme is not installed properly');
				return '';
			};
			let state = this.active ? 'active' : 'default';
			if (this.disabled) {
				state = 'disabled';
			}
			// add tags first
			let classes = [
				tag,
				`${tag}-state-${state}`
			];
			// base theme classes
			classes.push(theme.base);
			// state theme classes
			classes.push(theme.state[state]);
			return classes;
		}
	}
};
