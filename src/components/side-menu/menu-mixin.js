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
		}
	}
};
