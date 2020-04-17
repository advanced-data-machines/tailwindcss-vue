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
		className: {
			type: String,
			default: 'tv-autocomplete-item'
		},
		active: {
			type: Boolean,
			default: false
		}
	},
	computed: {
		currentClass() {
			const tag = this.className;
			const theme = this.currentTheme;
			const active = this.active ? 'active' : 'default';
			return [
				tag,
				theme.base,
				`is-${active}`,
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
