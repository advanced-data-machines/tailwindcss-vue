<template>
	<div v-if="separator" :class="separatorClass" />
	<div v-else-if="custom" :role="itemAriaRole" :tabindex="focusable ? 0 : null">
		<slot />
	</div>
	<div v-else :class="currentClass" @click="selectItem" :role="itemAriaRole" :tabindex="focusable ? 0 : null">
		<slot />
	</div>
</template>
<script>
import ThemeMixin from '../../mixins/theme.js';
export default {
	name: 'TvDropdownItem',
	mixins: [ThemeMixin],
	props: {
		className: {
			type: String,
			default: 'tv-dropdown-item'
		},
		value: {
			type: [Object, String, Boolean, Array, Number, Function],
			default: null
		},
		disabled: {
			type: Boolean,
			default: false
		},
		separator: {
			type: Boolean,
			default: false
		},
		focusable: {
			type: Boolean,
			default: true
		},
		ariaRole: {
			type: String,
			default: null
		},
		excludePadding: {
			type: Boolean,
			default: false
		},
		custom: {
			type: Boolean,
			default: false
		}
	},
	computed: {
		currentClass() {
			const tag = this.className;
			const theme = this.currentTheme;
			const state = this.isClickable ? 'normal' : 'disabled';
			const active = this.isActive ? 'active' : 'default';
			return [
				tag,
				`is-${state} is-${active}`,
				!this.excludePadding ? theme.padding : '',
				theme[state][active]
			];
		},
		separatorClass() {
			const tag = `${this.className}-separator`;
			const theme = this.currentTheme.separator;
			return [
				tag,
				theme
			];
		},
		itemAriaRole() {
			return (this.ariaRole === 'menuitem' || this.ariaRole === 'listitem') ? this.ariaRole : null;
		},
		isClickable() {
			return !this.dropdown.disabled && !this.disabled && !this.separator && !this.custom;
		},
		isActive() {
			if (this.dropdown.selected === null) return false;
			if (this.dropdown.multiple) return this.dropdown.selected.indexOf(this.value) > -1;
			return this.value === this.dropdown.selected;
		},
		dropdown() {
			let parent = this.$parent;
			let parentName = parent.$options.name;
			while (parentName !== 'TvDropdown') {
				parent = parent.$parent;
				parentName = parent.$options.name;
			}
			return parent;
		}
	},
	methods: {
		selectItem() {
			if (!this.isClickable) return;
			this.dropdown.selectItem(this.value);
			this.$emit('click');
		}
	}
};
</script>
