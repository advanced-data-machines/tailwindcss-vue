<template>
	<div :class="[wrapperClass, 'dropdown', {'hoverable': isHoverable}]">
		<div class="" role="button" ref="trigger" @click="toggle" aria-haspopup="true">
			<slot name="trigger" />
		</div>
		<custom-transition>
			<div
				v-show="(!disabled && (isActive || isHoverable))"
				:class="[currentClass, 'dropdown-menu']"
				ref="dropdownMenu"
				:aria-hidden="!isActive"
			>
				<div :class="contentClass" :role="menuAriaRole">
					<slot />
				</div>
			</div>
		</custom-transition>
	</div>
</template>
<script>
import ThemeMixin from '@/mixins/theme.js';
import CustomTransition from '@/components/transitions/custom-transition.vue';
export default {
	name: 'TvDropdown',
	mixins: [ThemeMixin],
	components: {
		'custom-transition': CustomTransition
	},
	props: {
		value: {
			type: [Object, String, Boolean, Array, Number, Function],
			default: () => {}
		},
		multiple: {
			type: Boolean,
			default: false
		},
		disabled: {
			type: Boolean,
			default: false
		},
		hoverable: {
			type: Boolean,
			default: false
		},
		closeOnClick: {
			type: Boolean,
			default: true
		},
		canClose: {
			type: [Array, Boolean],
			default: true
		},
		position: {
			type: String,
			default: 'bottom-left',
			validate: (value) => ['bottom-left', 'bottom-right', 'top-left', 'top-right'].indexOf(value) > -1
		},
		ariaRole: {
			type: String,
			default: null
		}
	},
	data() {
		return {
			selected: this.value,
			isActive: false,
			isHoverable: this.hoverable
		};
	},
	computed: {
		wrapperClass() {
			const tag = `${this.$options._componentTag}-wrapper`;
			const theme = this.currentTheme;
			return [
				tag,
				theme.wrapper
			];
		},
		contentClass() {
			const tag = `${this.$options._componentTag}-content`;
			const theme = this.currentTheme;
			return [
				tag,
				theme.content
			];
		},
		currentClass() {
			const tag = `${this.$options._componentTag}-menu`;
			const theme = this.currentTheme;
			const position = this.position;
			const state = this.isHoverable ? 'hoverable' : 'default';
			return [
				tag,
				`${tag}-${position}`,
				this.isActive ? `${tag}-active` : '',
				theme.base,
				theme.state[state],
				theme.position[position.replace(/(-\w)/g, (k) => k[1].toUpperCase())]
			];
		},
		cancelOptions() {
			return typeof this.canClose === 'boolean'
				? this.canClose
					? ['escape', 'outside']
					: []
				: this.canClose;
		},
		menuAriaRole() {
			return (this.ariaRole === 'menu' || this.ariaRole === 'list') ? this.ariaRole : null;
		}
	},
	methods: {
		selectItem(value) {
			if (this.multiple) {
				if (this.selected && Array.isArray(this.selected)) {
					const index = this.selected.indexOf(value);
					if (index === -1) {
						this.selected.push(value);
					} else {
						this.selected.splice(index, 1);
					}
				} else {
					this.selected = [value];
				}
				this.$emit('change', this.selected);
			} else {
				if (this.selected !== value) {
					this.selected = value;
					this.$emit('change', this.selected);
				}
			}
			this.$emit('input', this.selected);
			if (!this.multiple) {
				this.isActive = !this.closeOnClick;
				if (this.hoverable && this.closeOnClick) {
					this.isHoverable = false;
					setTimeout(() => {
						this.isHoverable = true;
					}, 250);
				}
			}
		},
		isChild(key, target) {
			if (this.$refs[key] !== undefined) {
				const children = this.$refs[key].querySelectorAll('*');
				for (const child of children) {
					if (target === child) return true;
				}
			}
			return false;
		},
		isInWhiteList(target) {
			const whitelist = ['trigger', 'dropdownMenu'];
			for (const elem of whitelist) {
				if (target === this.$refs[elem] || this.isChild(elem, target)) return true;
			}
			return false;
		},
		toggle() {
			if (this.disabled) return;
			this.isActive = !this.isActive;
		},
		clickOutside(event) {
			if (this.isActive && this.cancelOptions.indexOf('outside') > -1 && !this.isInWhiteList(event.target)) this.isActive = false;
		},
		keyPress(event) {
			if (this.isActive && event.keyCode === 27 && this.cancelOptions.indexOf('escape') > -1) this.isActive = false;
		}
	},
	watch: {
		value(value) {
			this.selected = value;
		},
		isActive(value) {
			this.$emit('active-change', value);
		}
	},
	created() {
		if (typeof window !== 'undefined') {
			document.addEventListener('click', this.clickOutside);
			document.addEventListener('keyup', this.keyPress);
		}
	},
	beforeDestroy() {
		if (typeof window !== 'undefined') {
			document.removeEventListener('click', this.clickOutside);
			document.removeEventListener('keyup', this.keyPress);
		}
	}
};
</script>
<style>
	.dropdown.hoverable:hover .dropdown-menu {
		display: block;
	}
</style>
