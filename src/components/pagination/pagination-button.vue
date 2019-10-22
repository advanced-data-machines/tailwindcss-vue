<template>
	<button :class="currentClass" @click="handleClick">
		<slot />
	</button>
</template>
<script>
import ThemeMixin from '@/mixins/theme.js';
export default {
	name: 'TvPaginationButton',
	mixins: [ ThemeMixin ],
	props: {
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
			const tag = this.$options._componentTag;
			const theme = this.currentTheme;
			const square = this.square ? 'square' : 'normal';
			const style = this.outline ? 'outline' : 'solid';
			const disabled = this.disabled ? 'disabled' : 'normal';
			return [
				tag,
				`${tag}-size-${this.size}`,
				`${tag}-${disabled}-${this.variant}-${style}`,
				theme.base,
				this.rounded ? `${tag}-rounded ${theme.rounded}` : '',
				theme.size[square][this.size],
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
