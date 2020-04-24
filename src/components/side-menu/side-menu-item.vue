<template>
	<li :class="currentClass" @click="handleClick">
		<slot />
		<slot name="title" :menu-collapsed="menuCollapsed" />
	</li>
</template>
<script>
import Emitter from '../../mixins/emitter.js';
import Menu from './menu-mixin.js';
export default {
	name: 'TvSideMenuItem',
	mixins: [Emitter, Menu],
	props: {
		className: {
			type: String,
			default: 'tv-side-menu-item'
		},
		index: {
			type: String,
			default: null,
			validator: val => typeof val === 'string' || val === null
		},
		route: {
			type: [String, Object],
			default: ''
		},
		disabled: {
			type: Boolean,
			default: false
		}
	},
	computed: {
		active() {
			return this.index === this.rootMenu.activeIndex;
		},
		menuCollapsed() {
			return this.rootMenu.collapse;
		}
	},
	methods: {
		handleClick() {
			if (!this.disabled) {
				this.dispatch('TvSideMenu', 'item-click', this);
				this.$emit('click', this);
			}
		}
	},
	mounted() {
		this.parentMenu.addItem(this);
		this.rootMenu.addItem(this);
	},
	beforeDestroy() {
		this.parentMenu.removeItem(this);
		this.rootMenu.removeItem(this);
	}
};
</script>
