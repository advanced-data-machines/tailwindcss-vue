<template>
	<li :class="{
		'side-submenu-item': true,
		'relative':true,
		'is-active': active,
		'is-opened': opened,
		'is-disabled': disabled
	}" @mouseenter="hover = true" @mouseleave="hover = false"
	>
		<div @click="handleClick" class="side-submenu-item-title relative">
			<slot name="icon" />
			<fade-in-transition>
				<span v-show="!menuCollapsed">
					<slot name="title" />
				</span>
			</fade-in-transition>
			<fade-in-transition :duration="{ leave: 100, enter: 300 }" :delay="{ leave: 0, enter: 400 }">
				<i v-show="!menuCollapsed" :class="['arrow mdi mdi-chevron-right', theme]" />
			</fade-in-transition>
		</div>
		<slide-y-up-transition v-if="menuCollapsed">
			<ul v-show="hover" class="popup side-sub-menu-children" :style="{'width': popupWidth, 'right': `-${popupWidth}`}">
				<slot />
			</ul>
		</slide-y-up-transition>
		<collapse-transition v-else>
			<ul v-show="opened" class="side-sub-menu-children">
				<slot />
			</ul>
		</collapse-transition>
	</li>
</template>
<script>
import CollapseTransition from '../transistions/collapse-transition.vue';
import SlideYUpTransition from '../transistions/slide-y-up-transition.vue';
import FadeInTransition from '../transistions/fade-in-transition.vue';
import Emitter from '../../mixins/emitter.js';
import Menu from './menu-mixin.js';
export default {
	name: 'TvSideSubmenu',
	mixins: [Emitter, Menu],
	components: {
		'collapse-transition': CollapseTransition,
		'slide-y-up-transition': SlideYUpTransition,
		'fade-in-transition': FadeInTransition
	},
	props: {
		index: {
			type: String,
			default: null,
			validator: val => typeof val === 'string' | val === null
		},
		disabled: {
			type: Boolean,
			default: false
		},
		theme: {
			type: String,
			default: 'dark'
		},
		popupWidth: {
			type: String,
			default: '200px'
		}
	},
	data() {
		return {
			items: {},
			submenus: {},
			hover: false
		};
	},
	computed: {
		menuCollapsed() {
			return this.rootMenu.collapse;
		},
		opened() {
			return this.rootMenu.openedMenus.indexOf(this.index) > -1;
		},
		active() {
			let isActive = false;
			const submenus = this.submenus;
			const items = this.items;

			Object.keys(items).forEach(index => {
				if (items[index].active) {
					isActive = true;
				}
			});

			Object.keys(submenus).forEach(index => {
				if (submenus[index].active) {
					isActive = true;
				}
			});

			return isActive;
		},
		isFirstLevel() {
			let isFirstLevel = true;
			let parent = this.$parent;
			while (parent && parent !== this.rootMenu) {
				// is not first level
				if (['TvSubmenu'].indexOf(parent.$options.name) > -1) {
					isFirstLevel = false;
					break;
				} else {
					parent = parent.$parent;
				}
			}
			return isFirstLevel;
		}
	},
	methods: {
		addItem(item) {
			this.$set(this.items, item.index, item);
		},
		removeItem(item) {
			delete this.items[item.index];
		},
		addSubmenu(item) {
			this.$set(this.submenus, item.index, item);
		},
		removeSubmenu(item) {
			delete this.submenus[item.index];
		},
		handleClick() {
			const { rootMenu, disabled } = this;
			if (rootMenu.collapse || disabled) {
				return;
			}
			this.dispatch('TvSideMenu', 'submenu-click', this);
		}
	},
	mounted() {
		this.parentMenu.addSubmenu(this);
		this.rootMenu.addSubmenu(this);
	},
	beforeDestroy() {
		this.parentMenu.removeSubmenu(this);
		this.rootMenu.removeSubmenu(this);
	}
};
</script>
<style lang="postcss">
.arrow {
	@apply inline-block absolute;
	top: 50%;
	font-size: 20px;
	margin-top: -15px;
	right: 1rem;
	transition: transform .3s;
}
.arrow.dark {
	@apply text-gray-100;
}
.sub-menu-item .title:hover .arrow.dark {
	@apply text-gray-300;
}

.arrow.light {
	@apply text-gray-700;
}
.sub-menu-item .title:hover .arrow.light {
	@apply text-gray-900;
}

.is-opened .arrow {
	transform: rotate(90deg);
}

.side-submenu-item {
	& .popup {
		@apply absolute top-0;
	}
}
</style>
