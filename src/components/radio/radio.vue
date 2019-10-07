<template>
	<label role="checkbox"
		:class="currentClass"
		ref="label"
		@click="focus"
		@keydown.prevent.enter="$refs.label.click()"
	>
		<input
			ref="input"
			type="radio"
			:name="name"
			@click.stop
			v-model="computedValue"
			:disabled="isDisabled"
			:value="nativeValue"
		>
		<slot />
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
			return [
				tag,
				theme.base
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
