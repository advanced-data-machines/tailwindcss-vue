<template>
	<input
		v-if="this.tagName == 'input'"
		ref="input"
		:class="currentClass"
		:disabled="isDisabled"
		:readonly="readonly"
		:value="computedValue"
		:type="this.type"
		:autocomplete="this.autocompleate"
		@input="handleInput"
		@focus="handleFocus"
		@blur="handleBlur"
		@change="handleChange"
	>
	<textarea
		v-else
		ref="input"
		:class="currentClass"
		:disabled="isDisabled"
		:readonly="readonly"
		:value="computedValue"
		@input="handleInput"
		@focus="handleFocus"
		@blur="handleBlur"
		@change="handleChange"
	/>
</template>
<script>
import Emitter from '../../mixins/emitter.js';
import ThemeMixin from '../../mixins/theme.js';
export default {
	name: 'TvInput',
	mixins: [Emitter, ThemeMixin],
	inject: {
		rootForm: {
			default: ''
		},
		formGroup: {
			default: ''
		}
	},
	props: {
		className: {
			type: String,
			default: 'tv-input'
		},
		tagName: {
			type: String,
			default: 'input',
			validate: (value) => ['input', 'textarea'].indexOf(value) !== -1
		},
		type: {
			type: String,
			default: 'text'
		},
		value: {
			type: [String, Number],
			default: null
		},
		validateEvent: {
			type: Boolean,
			default: true
		},
		disabled: {
			type: Boolean,
			default: false
		},
		readonly: {
			type: Boolean,
			default: false
		},
		size: {
			type: String,
			default: null,
			validator: (value) => value == null || ['sm', 'lg'].indexOf(value) !== -1
		},
		autocompleate: {
			type: String,
			default: 'off'
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
		showSuccessState() {
			return this.formGroup.showSuccessState;
		},
		validateState() {
			let state = this.formGroup ? this.formGroup.validateState : '';
			if (state === 'success' && !this.showSuccessState) state = 'default';
			return state;
		},
		isDisabled() {
			return this.disabled || (this.rootForm || {}).disabled;
		},
		currentClass() {
			const tag = this.className;
			const theme = this.currentTheme;
			const state = this.validateState || 'default';
			const size = this.size || 'default';
			const classes = [
				tag,
				`is-size-${size}`,
				theme.base,
				theme.size[size]
			];
			if (this.isDisabled) {
				classes.push(`is-disabled ${theme.state.disabled}`);
			} else if (this.readonly) {
				classes.push(`is-readonly ${theme.state.readonly}`);
			} else {
				classes.push(`has-${state} ${theme.state[state]}`);
			}
			return classes;
		}
	},
	watch: {
		value(value) {
			this.newValue = value;
			if (this.validateEvent) {
				this.dispatch('TvFormGroup', 'form.change', [value]);
			}
		}
	},
	methods: {
		handleInput(e) {
			this.$nextTick(() => {
				if (e.target) {
					this.computedValue = e.target.value;
				}
			});
		},
		handleBlur(event) {
			this.isFocused = false;
			this.$emit('blur', event);
			if (this.validateEvent) {
				this.dispatch('TvFormGroup', 'form.blur', [this.value]);
			}
		},
		handleChange(event) {
			this.$emit('change', event.target.value);
		},
		handleFocus(event) {
			this.isFocused = true;
			this.$emit('focus', event);
		},
		focus() {
			this.$refs.input.focus();
		},
		onBlur() {
			this.$refs.input.blur();
		}
	}
};
</script>
