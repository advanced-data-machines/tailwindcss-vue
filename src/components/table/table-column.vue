<template>
	<td :class="currentClass">
		<slot />
	</td>
</template>
<script>
import ThemeMixin from '../../mixins/theme.js';
export default {
	name: 'TvTableColumn',
	mixins: [ThemeMixin],
	props: {
		label: {
			type: String,
			default: null
		},
		field: {
			type: String,
			default: null
		}
	},
	computed: {
		currentClass() {
			const tag = this.$options._componentTag;
			const theme = this.currentTheme;
			let classes = [
				tag,
				theme.base
			];
			return classes;
		}
	}
};
</script>
