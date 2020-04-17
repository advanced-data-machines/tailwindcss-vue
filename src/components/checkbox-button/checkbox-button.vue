<template>
	<label
		ref="label"
		role="checkbox"
		:class="['relative', currentClass]"
		@click="focus"
		:disabled="disabled"
		@keydown.prevent.enter="$refs.label.click()"
	>
		<slot />
		<input
			ref="input"
			type="checkbox"
			:name="name"
			@click.stop
			v-model="computedValue"
			:disabled="isDisabled"
			:value="nativeValue"
			:true-value="trueValue"
			:false-value="falseValue"
			@focus="isFocused = true"
			@blur="isFocused = false"
			class="absolute left-0 opacity-0"
		>
	</label>
</template>
<script>
import Emitter from '../../mixins/emitter.js';
import ThemeMixin from '../../mixins/theme.js';
export default {
	name: 'TvCheckboxButton',
	mixins: [Emitter, ThemeMixin],
	inject: {
		rootForm: {
			default: ''
		}
	},
	props: {
		className: {
			type: String,
			default: 'tv-checkbox-button'
		},
		value: {
			type: [Object, String, Boolean, Array, Number, Function],
			default: undefined
		},
		nativeValue: {
			type: [Object, String, Boolean, Array, Number, Function],
			default: undefined
		},
		variant: {
			type: String,
			default: null,
			validator: (value) => value == null || ['primary', 'info', 'success', 'danger', 'warning'].indexOf(value) !== -1
		},
		size: {
			type: String,
			default: 'default',
			validator: (value) => ['default', 'sm', 'lg'].indexOf(value) > -1
		},
		name: {
			type: String,
			default: ''
		},
		disabled: {
			type: Boolean,
			default: false
		},
		trueValue: {
			type: [Object, String, Boolean, Array, Number, Function],
			default: true
		},
		falseValue: {
			type: [Object, String, Boolean, Array, Number, Function],
			default: false
		}
	},
	data() {
		return {
			newValue: this.value,
			isFocused: false
		};
	},
	computed: {
		computedValue: {
			get() {
				return this.newValue;
			},
			set(value) {
				this.newValue = value;
				this.$emit('input', value);
			}
		},
		isDisabled() {
			return this.disabled || (this.rootForm || {}).disabled;
		},
		checked() {
			if (Array.isArray(this.newValue)) {
				return this.newValue.indexOf(this.nativeValue) !== -1;
			}
			return this.newValue === this.nativeValue;
		},
		currentClass() {
			const tag = this.className;
			const theme = this.currentTheme;
			const variant = this.variant || 'default';
			const size = this.size || 'default';
			const status = this.checked ? 'checked' : 'unchecked';
			return [
				tag,
				`is-size-${size}`,
				this.isDisabled
					? `is-${variant} is-disabled ${theme.disabled[variant][status]}`
					: `is-${variant} is-${status} ${theme.normal[variant][status]}`,
				theme.base,
				theme.size[size]
			];
		}
	},
	methods: {
		focus() {
			// macOS FireFox and Safari do not focus when clicked
			this.$refs.input.focus();
		}
	},
	watch: {
		value(value) {
			this.newValue = value;
			this.dispatch('TvFormGroup', 'form.change', value);
		}
	}
};
</script>
