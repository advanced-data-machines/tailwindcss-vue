<template>
	<label
		ref="label"
		role="checkbox"
		:class="currentClass"
		@click="focus"
		@keydown.prevent.enter="$refs.label.click()"
	>
		<input
			ref="input"
			type="checkbox"
			:name="name"
			@click.stop
			:indeterminate.prop="indeterminate"
			v-model="computedValue"
			:disabled="isDisabled"
			:value="nativeValue"
			class="align-middle"
			:true-value="trueValue"
			:false-value="falseValue"
		>
		<span class="align-middle">
			<slot />
		</span>
	</label>
</template>
<script>
import Emitter from '../../mixins/emitter.js';
export default {
	name: 'TvCheckbox',
	mixins: [Emitter],
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
			default: null
		},
		falseValue: {
			type: [Object, String, Boolean, Array, Number, Function],
			default: null
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
		isDisabled() {
			return this.disabled || (this.rootForm || {}).disabled;
		},
		currentClass() {
			const tag = this.$options._componentTag;
			const theme = this.$tvTheme[this.$options.name];
			// add tags first
			let classes = [
				tag,
				theme.base
			];
			// base theme classes
			classes.push(theme.base);
			return classes;
		}
	},
	methods: {
		focus() {
			// MacOS FireFox and Safari do not focus when clicked
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
