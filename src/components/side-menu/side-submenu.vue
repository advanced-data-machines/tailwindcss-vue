<template>
	<li class="relative" @mouseenter="hover = true" @mouseleave="hover = false">
		<div @click="handleClick" :class="['relative', currentClass]">
			<slot name="icon" />
			<slot name="title" :menu-collapsed="menuCollapsed" />
			<slot name="arrow" :collapse="menuCollapsed" :opened="opened">
				<tv-menu-arrow :collapse="menuCollapsed" :opened="opened" :menu-arrow-class="menuArrowClass" />
			</slot>
		</div>
		<transition
			v-if="menuCollapsed"
			:transition="transition"
			:enter-class="enterClass"
			:enter-active-class="enterActiveClass"
			:enter-to-class="enterToClass"
			:leave-class="leaveClass"
			:leave-active-class="leaveActiveClass"
			:leave-to-class="leaveToClass"
		>
			<ul v-show="hover" class="absolute top-0 z-30 children" :style="{'width': popupWidth, 'right': `-${popupWidth}`}">
				<slot />
			</ul>
		</transition>
		<tv-collapse-transition v-else>
			<ul v-show="opened" class="children">
				<slot />
			</ul>
		</tv-collapse-transition>
	</li>
</template>
<script>
import TvCollapseTransition from '../collapse-transition/collapse-transition.vue';
import TransitionMixin from '../../mixins/transition.js';
import MenuArrow from './menu-arrow.vue';
import Emitter from '../../mixins/emitter.js';
import Menu from './menu-mixin.js';
export default {
	name: 'TvSideSubmenu',
	mixins: [Emitter, Menu, TransitionMixin],
	components: {
		'tv-collapse-transition': TvCollapseTransition,
		'tv-menu-arrow': MenuArrow
	},
	props: {
		className: {
			type: String,
			default: 'tv-side-submenu'
		},
		index: {
			type: String,
			default: null,
			validator: val => typeof val === 'string' || val === null
		},
		disabled: {
			type: Boolean,
			default: false
		},
		popupWidth: {
			type: String,
			default: '200px'
		},
		menuArrowClass: {
			type: String,
			default: 'pl-1 pr-4'
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
