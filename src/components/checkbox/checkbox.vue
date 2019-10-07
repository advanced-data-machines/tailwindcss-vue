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
			:true-value="trueValue"
			:false-value="falseValue"
		>
		<span>
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
		}
	},
	props: {
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
			const theme = this.currentTheme;
			// add tags first
			let classes = [
				tag,
				theme.base
			];
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
			// MacOS FireFox and Safari do not focus when clicked
			this.$refs.input.focus();
		}
	}
};
</script>
