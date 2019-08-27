<template>
	<label
		ref="label"
		role="radio"
		:class="['relative', currentClass]"
		@click="focus"
		:disabled="disabled"
		@keydown.prevent.enter="$refs.label.click()"
	>
		<slot />
		<input
			ref="input"
			type="radio"
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
	name: 'TvRadioButton',
	mixins: [Emitter, ThemeMixin],
	inject: {
		rootForm: {
			default: ''
		}
	},
	props: {
		value: {
			type: [Object, String, Boolean, Array, Number, Function],
			default: () => {}
		},
		nativeValue: {
			type: [Object, String, Boolean, Array, Number, Function],
			default: () => {}
		},
		variant: {
			type: String,
			default: null,
			validator: (value) => value == null || ['primary', 'info', 'success', 'danger', 'warning'].indexOf(value) !== -1
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
			default: null
		},
		falseValue: {
			type: [Object, String, Boolean, Array, Number, Function],
			default: null
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
		currentClass() {
			const tag = this.$options._componentTag;
			const theme = this.currentTheme;
			const variant = this.variant || 'default';
			const size = this.size || 'default';
			const status = (this.newValue === this.nativeValue) ? 'checked' : 'unchecked';
			// add tags first
			let classes = [
				tag,
				`${tag}-size-${size}`,
				this.disabled ? `${tag}-${variant}-disabled` : `${tag}-${variant}-${status}`
			];
			// base theme classes
			classes.push(theme.base);
			// size theme classes
			classes.push(theme.size[size]);
			// if disabled skip normal variant classes
			// else add normal variant classes
			if (this.isDisabled) {
				classes.push(`${theme.disabled[variant][status]}`);
			} else {
				classes.push(`${theme.normal[variant][status]}`);
			}

			return classes;
		}
	},
	watch: {
		value(value) {
			this.newValue = value;
			this.dispatch('TvFormGroup', 'form.change', value);
		}
	},
	methods: {
		focus() {
			// macOS FireFox and Safari do not focus when clicked
			this.$refs.input.focus();
		}
	}
};
</script>
