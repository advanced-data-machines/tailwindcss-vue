<template>
	<input
		v-if="this.tagName == 'input'"
		ref="input"
		:class="currentClass"
		:disabled="inputDisabled"
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
		:disabled="inputDisabled"
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
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			newValue: this.value
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
		inputDisabled() {
			return this.disabled || (this.rootForm || {}).disabled;
		},
		currentClass() {
			const tag = this.$options._componentTag;
			const theme = this.currentTheme;
			if (!theme) {
				console.warn('(TV Warn[Theme -TvInput]) - theme is not installed properly');
				return '';
			};
			const state = this.validateState || 'default';
			const size = this.size || 'default';
			// add tags first
			let classes = [
				tag,
				`${tag}-size-${size}`,
				this.disabled ? `${tag}-state-disabled` : `${tag}-state-${state}`
			];
			// base theme classes
			classes.push(theme.base);
			// size theme classes
			classes.push(theme.size[size]);
			// if disabled skip normal state classes
			// else add normal state classes
			if (this.inputDisabled) {
				classes.push(`${theme.state.disabled}`);
			} else if (this.readonly) {
				classes.push(`${theme.state.readonly}`);
			} else {
				classes.push(`${theme.state[state]}`);
			}
			return classes;
		}
	},
	watch: {
		value(value) {
			this.newValue = value;
			if (this.validateEvent) {
				console.log('validate');
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
			this.focused = false;
			this.$emit('blur', event);
			if (this.validateEvent) {
				this.dispatch('TvFormGroup', 'form.blur', [this.value]);
			}
		},
		handleChange(event) {
			this.$emit('change', event.target.value);
		},
		handleFocus(event) {
			this.focused = true;
			this.$emit('focus', event);
		},
		select() {
			this.$refs.input.select();
		},
		focus() {
			this.$refs.input.focus();
		},
		blur() {
			this.$refs.input.blur();
		}
	}
};
</script>
