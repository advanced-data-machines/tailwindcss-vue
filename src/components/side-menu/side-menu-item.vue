<template>
	<li :class="currentClass" @click="handleClick">
		<slot />
		<fade-in-transition v-if="transitionTitle">
			<span v-show="!menuCollapsed">
				<slot name="title" />
			</span>
		</fade-in-transition>
		<slot v-else name="title" />
	</li>
</template>
<script>
import FadeInTransition from '../transistions/fade-in-transition.vue';
import Emitter from '../../mixins/emitter.js';
import Menu from './menu-mixin.js';
export default {
	name: 'TvSideMenuItem',
	components: {
		'fade-in-transition': FadeInTransition
	},
	mixins: [Emitter, Menu],
	props: {
		index: {
			type: String,
			default: null,
			validator: val => typeof val === 'string' | val === null
		},
		route: {
			type: [String, Object],
			default: ''
		},
		disabled: {
			type: Boolean,
			default: false
		},
		transitionTitle: {
			type: Boolean,
			default: true
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
