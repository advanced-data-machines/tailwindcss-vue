<template>
	<th :class="currentClass" @click.stop="handleClick">
		<slot :column="column" :index="index">
			{{ column.label }}
		</slot>
	</th>
</template>
<script>
import ThemeMixin from '../../mixins/theme.js';
export default {
	name: 'TvTableHeader',
	mixins: [ThemeMixin],
	props: {
		column: {
			type: Object,
			default: () => {
				return { label: '' };
			}
		},
		index: {
			type: [String, Number],
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
	},
	methods: {
		handleClick() {
			this.$emit('click');
		}
	}
};
</script>
