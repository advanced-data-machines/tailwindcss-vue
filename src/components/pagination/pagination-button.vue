<template>
	<button type="button" :class="currentClass" @click="handleClick" :disabled="disabled">
		<slot />
	</button>
</template>
<script>
import ThemeMixin from '../../mixins/theme.js';
export default {
	name: 'TvPaginationButton',
	mixins: [ThemeMixin],
	props: {
		className: {
			type: String,
			default: 'tv-pagination-button'
		},
		variant: {
			type: String,
			default: 'default',
			validator: (value) => ['default', 'primary', 'info', 'success', 'danger', 'warning'].indexOf(value) > -1
		},
		size: {
			type: String,
			default: 'default',
			validator: (value) => ['default', 'sm', 'lg'].indexOf(value) > -1
		},
		disabled: {
			type: Boolean,
			default: false
		},
		outline: {
			type: Boolean,
			default: false
		},
		square: {
			type: Boolean,
			default: null
		},
		rounded: {
			type: Boolean,
			default: false
		}
	},
	computed: {
		currentClass() {
			const tag = this.className;
			const theme = this.currentTheme;
			const size = this.size;
			const square = this.square ? 'square' : 'normal';
			const style = this.outline ? 'outline' : 'solid';
			const disabled = this.disabled ? 'disabled' : 'normal';
			return [
				tag,
				`is-size-${size}`,
				`is-${disabled} is-${this.variant} is-${style}`,
				theme.base,
				this.rounded ? `is-rounded ${theme.rounded}` : '',
				theme.size[square][size],
				`${theme[disabled][this.variant][style]}`
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
