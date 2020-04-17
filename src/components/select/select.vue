<template>
	<div :class="[wrapperClass]">
		<select
			ref="select"
			v-model="computedValue"
			:disabled="isDisabled"
			:multiple="multiple"
			:class="[currentClass, customInputClass]"
			@blur="handleBlur"
			@focus="handleFocus"
			@change="$emit('change')"
		>
			<template v-if="placeholder">
				<option
					v-if="computedValue == null"
					:value="null"
					disabled
					hidden
				>
					{{ placeholder }}
				</option>
				<option
					v-if="computedValue === ''"
					:value="''"
					disabled
					hidden
				>
					{{ placeholder }}
				</option>
			</template>
			<slot />
		</select>
		<slot name="arrow" v-if="!this.multiple">
			<div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3">
				<svg :class="['fill-current', arrowClass]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
					<path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
				</svg>
			</div>
		</slot>
	</div>
</template>
<script>
import Emitter from '../../mixins/emitter.js';
import ThemeMixin from '../../mixins/theme.js';
export default {
	name: 'TvSelect',
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
			default: 'tv-select'
		},
		value: {
			type: [Object, String, Boolean, Array, Number, Function],
			default: null
		},
		placeholder: {
			type: String,
			default: null
		},
		multiple: {
			type: Boolean,
			default: false
		},
		disabled: {
			type: Boolean,
			default: false
		},
		size: {
			type: String,
			default: null,
			validator: (value) => value == null || ['sm', 'lg'].indexOf(value) !== -1
		},
		customInputClass: {
			type: String,
			default: ''
		}
	},
	data() {
		return {
			selectedValue: this.value
		};
	},
	computed: {
		computedValue: {
			get() {
				return this.selectedValue;
			},
			set(value) {
				this.selectedValue = value;
				this.$emit('input', value);
			}
		},
		validateState() {
			let state = this.formGroup ? this.formGroup.validateState : '';
			if (state === 'success' && !this.showSuccessState) state = 'default';
			return state;
		},
		isDisabled() {
			return this.disabled || (this.rootForm || {}).disabled;
		},
		wrapperClass() {
			const tag = `${this.className}-wrapper`;
			const theme = this.currentTheme.wrapper;
			return [
				tag,
				theme
			];
		},
		arrowClass() {
			const tag = `${this.className}-arrow`;
			const theme = this.currentTheme.arrow;
			const size = this.size || 'default';
			return [
				tag,
				`is-size-${size}`,
				theme.base,
				`${theme.size[size]}`
			];
		},
		currentClass() {
			const tag = this.className;
			const theme = this.currentTheme;
			const state = this.validateState || 'default';
			const size = this.size || 'default';
			return [
				tag,
				`is-size-${size}`,
				theme.base,
				this.isDisabled
					? `is-disabled ${theme.state.disabled}`
					: `has-${state} ${theme.state[state]}`,
				`${theme.size[size]}`
			];
		}
	},
	watch: {
		value(value) {
			this.selectedValue = value;
			this.dispatch('TvFormGroup', 'form.change', value);
		}
	},
	methods: {
		handleBlur(e) {
			this.$emit('blur', e);
		},
		handleFocus(e) {
			this.$emit('focus', e);
		}
	}
};
</script>
