<script>
import ThemeMixin from '../../mixins/theme.js';
export default {
	name: 'TvButton',
	mixins: [ThemeMixin],
	inject: {
		rootFrom: {
			default: ''
		},
		formGroup: {
			default: ''
		}
	},
	props: {
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
			default: null,
			validator: (value) => value == null || ['default', 'primary', 'info', 'success', 'danger', 'warning'].indexOf(value) !== -1
		},
		size: {
			type: String,
			default: null,
			validator: (value) => value == null || ['sm', 'lg'].indexOf(value) >= 0
		},
		disabled: {
			type: Boolean,
			default: false
		},
		outline: {
			type: Boolean,
			default: false
		}
	},
	computed: {
		buttonDisabled() {
			return this.disabled || (this.rootFrom || {}).disabled;
		},
		currentClass() {
			const tag = this.$options._componentTag;
			const theme = this.currentTheme;
			const variant = this.variant || 'default';
			const size = this.size || 'default';
			const style = this.outline ? 'outline' : 'solid';
			// add tags first
			let classes = [
				tag,
				`${tag}-size-${size}`,
				this.disabled ? `${tag}-${variant}-disabled` : `${tag}-${variant}-${style}`
			];
			// base theme classes
			classes.push(theme.base);
			// size theme classes
			classes.push(theme.size[size]);
			// if disabled skip normal variant classes
			// else add normal variant classes
			if (this.buttonDisabled) {
				classes.push(`${theme.disabled[variant][style]}`);
			} else {
				classes.push(`${theme.normal[variant][style]}`);
			}

			return classes;
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
			if (this.isARouterLink) {
				return {
					to: this.to,
					tag: this.tagName,
					activeClass: this.activeClass,
					exact: this.exact,
					event: ['click', 'focus', 'blur'],
					exactActiveClass: this.exactActiveClass,
					disabled: this.buttonDisabled,
					type: this.type
				};
			}
			return {
				id: this.id,
				disabled: this.buttonDisabled,
				href: this.href,
				type: this.type
			};
		}
	},
	render: function(createElement) {
		return createElement(
			this.componentToRender, {
				attrs: this.getAttributes(),
				class: this.currentClass,
				on: {
					click: this.handleClick,
					focus: this.handleFocus,
					blur: this.handleBlur
				}
			},
			this.$slots.default
		);
	}
};
</script>
