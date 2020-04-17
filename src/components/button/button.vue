<template>
	<component
		:is="componentToRender"
		:class="currentClass"
		v-bind="getAttributes()"
		@click="handleClick"
		@focus="handleFocus"
		@blur="handleBlur"
	>
		<slot />
	</component>
</template>
<script>
import ThemeMixin from '../../mixins/theme.js';
export default {
	name: 'TvButton',
	mixins: [ThemeMixin],
	inject: {
		rootFrom: {
			default: ''
		}
	},
	props: {
		className: {
			type: String,
			default: 'tv-button'
		},
		tagName: {
			type: String,
			default: 'button'
		},
		type: {
			type: String,
			default: 'button'
		},
		href: {
			type: String,
			default: null
		},
		to: {
			type: [String, Object],
			default: undefined
		},
		activeClass: {
			type: String,
			default: 'router-link-active'
		},
		exact: {
			type: Boolean,
			default: false
		},
		exactActiveClass: {
			type: String,
			default: 'router-link-exact-active'
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
			default: false
		},
		rounded: {
			type: Boolean,
			default: false
		}
	},
	computed: {
		isDisabled() {
			return this.disabled || (this.rootFrom || {}).disabled;
		},
		currentClass() {
			const tag = this.className;
			const theme = this.currentTheme;
			const size = this.size;
			const square = this.square ? 'square' : 'normal';
			const style = this.outline ? 'outline' : 'solid';
			const disabled = this.isDisabled ? 'disabled' : 'normal';
			return [
				tag,
				`is-size-${size}`,
				`is-${disabled} is-${this.variant} is-${style}`,
				theme.base,
				this.rounded ? `is-rounded ${theme.rounded}` : '',
				theme.size[square][size],
				`${theme[disabled][this.variant][style]}`
			];
		},
		isRouterlinkAvailable() {
			return !!this.$options.components.RouterLink;
		},
		isRouterLink() {
			return this.to !== undefined && this.isRouterlinkAvailable;
		},
		componentToRender() {
			if (this.isRouterLink) {
				return this.$options.components.RouterLink;
			}
			if (this.href) {
				return 'a';
			}
			return this.tagName;
		}
	},
	methods: {
		handleClick(event) {
			this.$emit('click', event);
		},
		handleFocus(event) {
			this.$emit('focus', event);
		},
		handleBlur(event) {
			this.$emit('blur', event);
		},
		focus() {
			this.$el.focus();
		},
		blur() {
			this.$el.blur();
		},
		getAttributes() {
			if (this.isRouterLink) {
				return {
					to: this.to,
					activeClass: this.activeClass,
					exact: this.exact,
					exactActiveClass: this.exactActiveClass,
					disabled: this.isDisabled,
					type: this.type
				};
			}
			return {
				disabled: this.isDisabled,
				href: this.href,
				type: this.type
			};
		}
	}
};
</script>
