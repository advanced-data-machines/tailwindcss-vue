<template>
	<div v-if="separator" :class="separatorClass" />
	<div v-else-if="custom" @click="selectItem" :role="itemAriaRole" :tabindex="focusable ? 0 : null">
		<slot />
	</div>
	<div v-else :class="currentClass" @click="selectItem" :role="itemAriaRole" :tabindex="focusable ? 0 : null">
		<slot />
	</div>
</template>
<script>
import ThemeMixin from '@/mixins/theme.js';
export default {
	name: 'TvDropdownItem',
	mixins: [ThemeMixin],
	props: {
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
		custom: {
			type: Boolean,
			default: false
		}
	},
	computed: {
		currentClass() {
			const tag = this.$options._componentTag;
			const theme = this.currentTheme;
			const state = this.isClickable ? 'normal' : 'disabled';
			const active = this.isActive ? 'active' : 'default';
			return [
				tag,
				`${tag}-${state}-${active}`,
				theme.base,
				theme[state][active]
			];
		},
		separatorClass() {
			const tag = `${this.$options._componentTag}-separator`;
			const theme = this.currentTheme;
			return [
				tag,
				theme.base
			];
		},
		itemAriaRole() {
			return (this.ariaRole === 'menuitem' || this.ariaRole === 'listitem') ? this.ariaRole : null;
		},
		isClickable() {
			return !this.$parent.disabled && !this.disabled && !this.separator && !this.custom;
		},
		isActive() {
			if (this.$parent.selected === null) return false;
			if (this.$parent.multiple) return this.$parent.selected.indexOf(this.value) > -1;
			return this.value === this.$parent.selected;
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
			this.$parent.selectItem(this.value);
			this.$emit('click');
		}
	},
	created() {
		if (this.$parent.$options.name !== 'TvDropdown') {
			console.warn('(TV Warn[Dropdown]) - dropdown-items should have a perent of dropdown"');
			this.$destroy();
		}
	}
};
</script>
