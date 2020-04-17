<template>
	<label role="radio"
		:class="currentClass"
		ref="label"
		@click="focus"
		@keydown.prevent.enter="$refs.label.click()"
	>
		<div :class="['radio', checkboxClass]">
			<input
				ref="input"
				type="radio"
				:name="name"
				@click.stop
				v-model="computedValue"
				:disabled="isDisabled"
				:value="nativeValue"
				class="absolute left-0 opacity-0"
			>
			<svg :class="svgClass" viewBox="0 0 20 20">
				<circle cx="10" cy="10" r="5" />
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
	name: 'TvRadio',
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
			default: 'tv-radio'
		},
		value: {
			type: [Object, String, Boolean, Array, Number, Function],
			default: () => {}
		},
		nativeValue: {
			type: [Object, String, Boolean, Array, Number, Function],
			default: () => {}
		},
		name: {
			type: String,
			default: ''
		},
		disabled: {
			type: Boolean,
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
					? `is-disabled ${theme.state.disabled}`
					: `has-${state} ${theme.state[state]}`
			];
		},
		checkboxClass() {
			const tag = `${this.className}-radio`;
			const theme = this.currentTheme.radio;

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
