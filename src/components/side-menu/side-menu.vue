<template>
	<ul :class="currentClass" :style="style">
		<slot name="body" />
		<slot name="footer" />
	</ul>
</template>
<script>
import emitter from '../../mixins/emitter.js';
import { isEmpty } from '../../utils/utils.js';
import ThemeMixin from '../../mixins/theme.js';
export default {
	name: 'TvSideMenu',
	mixins: [emitter, ThemeMixin],
	provide() {
		return {
			rootMenu: this
		};
	},
	props: {
		defaultActive: {
			type: String,
			default: ''
		},
		collapse: {
			type: Boolean,
			default: false
		},
		router: {
			type: Boolean,
			default: true
		},
		uniqueOpened: {
			type: Boolean,
			default: true
		},
		duration: {
			type: Number,
			default: 300
		}
	},
	data() {
		return {
			activeIndex: this.defaultActive,
			openedMenus: (this.defaultOpeneds && !this.collapse) ? this.defaultOpeneds.slice(0) : [],
			items: {},
			submenus: {}
		};
	},
	computed: {
		currentClass() {
			const tag = this.$options._componentTag;
			const theme = this.currentTheme;
			if (!theme) {
				console.warn('(TV Warn[Theme -TvSideMenu]) - theme is not installed properly');
				return '';
			};
			const state = this.collapse ? 'mini' : 'full';
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
		},
		style() {
			const durationInSeconds = this.duration / 1000;
			return { transition: `width ease-in-out ${durationInSeconds}s` };
		}
	},
	watch: {
		'items': 'updateActiveIndex'
	},
	methods: {
		updateActiveIndex(index) {
			const item = this.items[index] || this.items[this.activeIndex] || this.items[this.defaultActive];
			if (item) {
				this.activeIndex = item.index;
				this.initOpenedMenu();
			} else {
				this.activeIndex = null;
			}
		},
		addItem(item) {
			// set object 'items' with index as key and item as value
			if (item.index) {
				this.$set(this.items, item.index, item);
			}
		},
		removeItem(item) {
			// remove item from oject map
			delete this.items[item.index];
		},
		addSubmenu(item) {
			this.$set(this.submenus, item.index, item);
		},
		removeSubmenu(item) {
			delete this.submenus[item.index];
		},
		openMenu(index, indexPath) {
			let openedMenus = this.openedMenus;
			if (openedMenus.indexOf(index) !== -1) return;
			// collapse all menu that are not under current menu item
			if (this.uniqueOpened) {
				this.openedMenus = openedMenus.filter(index => {
					return indexPath.indexOf(index) !== -1;
				});
			}
			this.openedMenus.push(index);
		},
		closeMenu(index) {
			const i = this.openedMenus.indexOf(index);
			if (i !== -1) {
				this.openedMenus.splice(i, 1);
			}
		},
		handleSubmenuClick(submenu) {
			const { index, indexPath } = submenu;
			let isOpened = this.openedMenus.indexOf(index) !== -1;
			if (isOpened) {
				this.closeMenu(index);
				this.$emit('close', index, indexPath);
			} else {
				this.openMenu(index, indexPath);
				this.$emit('open', index, indexPath);
			}
		},
		handleItemClick(item) {
			const { index, indexPath } = item;
			const oldActiveIndex = this.activeIndex;
			const hasIndex = item.index !== null;

			if (hasIndex) {
				this.activeIndex = item.index;
			}

			this.$emit('select', index, indexPath, item);
			// if collapse clear open menues
			if (this.collapse) {
				this.openedMenus = [];
			}
			// if vue router and index exists - route to item
			if (this.router && hasIndex) {
				this.routeToItem(item, (error) => {
					this.activeIndex = oldActiveIndex;
					if (error) console.error(error);
				});
			}
		},
		// initialize opened menu
		initOpenedMenu() {
			const index = this.activeIndex;
			if (index && this.items && !isEmpty(this.items)) {
				const activeItem = this.items[index];

				let indexPath = activeItem.indexPath;
				// expand all submenus of the menu item
				indexPath.forEach(index => {
					let submenu = this.submenus[index];
					submenu && this.openMenu(index, submenu.indexPath);
				});
			}
		},
		routeToItem(item, onError) {
			const route = item.route || item.index;
			try {
				this.$router.push(route, () => {}, onError);
			} catch (e) {
				console.error(e);
			}
		},
		open(index) {
			const { indexPath } = this.submenus[index.toString()];
			indexPath.forEach(i => this.openMenu(i, indexPath));
		},
		close(index) {
			this.closeMenu(index);
		}
	},
	mounted() {
		this.initOpenedMenu();
		this.$on('item-click', this.handleItemClick);
		this.$on('submenu-click', this.handleSubmenuClick);
	}
};
</script>
