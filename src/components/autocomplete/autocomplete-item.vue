<template>
	<div @click="handleClick" :class="currentClass">
		<slot />
	</div>
</template>
<script>
import ThemeMixin from '../../mixins/theme.js';
export default {
	name: 'TvAutocompleteItem',
	mixins: [ThemeMixin],
	props: {
		active: {
			type: Boolean,
			default: false
		}
	},
	computed: {
		currentClass() {
			const tag = this.$options._componentTag;
			const theme = this.currentTheme;
			const active = this.active ? 'active' : 'default';
			return [
				tag,
				theme.base,
				`${tag}-${active}`,
				theme.normal[active]
			];
		}
	},
	methods: {
		handleClick() {
			this.$emit('click');
		}
	}	
};
</script>