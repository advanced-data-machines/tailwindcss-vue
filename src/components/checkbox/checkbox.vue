<template>
	<label
		ref="label"
		role="checkbox"
		:class="currentClass"
		@click="focus"
		@keydown.prevent.enter="$refs.label.click()"
	>
		<div :class="['checkbox', checkboxClass]">
			<input
				ref="input"
				type="checkbox"
				:name="name"
				@click.stop
				:indeterminate.prop="indeterminate"
				v-model="computedValue"
				:disabled="isDisabled"
				:value="nativeValue"
				:true-value="trueValue"
				:false-value="falseValue"
				class="absolute left-0 opacity-0"
			>
			<svg :class="svgClass" viewBox="0 0 20 20">
				<path v-if="indeterminate" d="M0,9h20v2H0V9z" />
				<path v-else d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
			</svg>
		</div>
		<span v-if="$scopedSlots['default']" :class="textClass">
			<slot />
		</span>
	</label>
</template>
<script>
import Emitter from '../../mixins/emitter.js';
import ThemeMixin from '../../mixins/theme.js';
export default {
	name: 'TvCheckbox',
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
			default: 'tv-checkbox'
		},
		value: {
			type: [Object, String, Boolean, Array, Number, Function],
			default: undefined
		},
		nativeValue: {
			type: [Object, String, Boolean, Array, Number, Function],
			default: undefined
		},
		name: {
			type: String,
			default: ''
		},
		disabled: {
			type: Boolean,
			default: false
		},
		indeterminate: {
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
		},
		showSuccessState: {
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
			const theme = this.currentTheme.label;
			const state = this.validateState || 'default';
			return [
				tag,
				theme.base,
				this.isDisabled
					? `disabled ${theme.state.disabled}`
					: `has-${state} ${theme.state[state]}`
			];
		},
		checkboxClass() {
			const tag = `${this.className}-checkbox`;
			const theme = this.currentTheme.checkbox;

			const state = this.validateState || 'default';
			return [
				tag,
				theme.base,
				this.isDisabled
					? `is-disabled ${theme.state.disabled}`
					: `has-${state} ${theme.state[state]}`
			];
		},
		svgClass() {
			const tag = `${this.className}-svg`;
			const theme = this.currentTheme.svg;
			return [
				tag,
				theme
			];
		},
		textClass() {
			const tag = `${this.className}-text`;
			const theme = this.currentTheme.text;
			return [
				tag,
				theme
			];
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
			// MacOS FireFox and Safari do not focus when clicked
			this.$refs.input.focus();
		}
	}
};
</script>
