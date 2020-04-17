<template>
	<label
		ref="label"
		role="checkbox"
		:class="currentClass"
		@click="focus"
		@keydown.prevent.enter="$refs.label.click()"
	>
		<div class="relative flex items-center">
			<input
				ref="input"
				type="checkbox"
				class="hidden"
				:name="name"
				@click.stop
				@change="checkEvent"
				v-model="computedValue"
				:disabled="isDisabled"
				:value="nativeValue"
				:true-value="trueValue"
				:false-value="falseValue"
			>
			<div :class="LineClass"	/>
			<div :class="dotClass" :style="dotStyle" />
			<slot />
		</div>
	</label>
</template>
<script>
import Emitter from '../../mixins/emitter.js';
import ThemeMixin from '../../mixins/theme.js';
export default {
	name: 'TvSwitch',
	mixins: [Emitter, ThemeMixin],
	inject: {
		rootForm: {
			default: ''
		}
	},
	props: {
		className: {
			type: String,
			default: 'tv-switch'
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
		change: {
			type: Function,
			default: undefined
		},
		size: {
			type: String,
			default: null,
			validator: (value) => value == null || ['sm', 'lg'].indexOf(value) >= 0
		},
		variant: {
			type: String,
			default: null,
			validator: (value) => value == null || ['default', 'primary', 'info', 'success', 'danger', 'warning'].indexOf(value) !== -1
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
			input: null,
			newValue: this.value,
			checked: false
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
			const tag = this.className;
			const theme = this.currentTheme;
			return [
				tag,
				theme.base
			];
		},
		dotClass() {
			const tag = `${this.className}-dot`;
			const theme = this.currentTheme.dot;
			const size = this.size || 'default';
			const state = this.checked ? 'checked' : 'unchecked';
			return [
				tag,
				`is-size-${size}`,
				state,
				theme.base,
				this.isDisabled ? `disabled ${theme.disabled[state]}` : theme.normal[state],
				theme.size[size]
			];
		},
		dotStyle() {
			const style = {
				left: '-.25rem',
				transition: 'all 0.3s ease-in-out'
			};

			if (this.checked) {
				style.transform = 'translateX(100%)';
			}
			return style;
		},
		LineClass() {
			const tag = `${this.className}-line`;
			const theme = this.currentTheme.line;
			const size = this.size || 'default';
			const state = this.checked ? 'checked' : 'unchecked';
			return [
				tag,
				`is-size-${size}`,
				`is-${state}`,
				theme.base,
				this.isDisabled ? `is-disabled ${theme.disabled[state]}` : theme.normal[state],
				theme.size[size]
			];
		}
	},
	watch: {
		value(value) {
			this.newValue = value;
			this.$nextTick(() => {
				this.checkEvent();
			});
			this.dispatch('TvFormGroup', 'form.change', value);
		}
	},
	methods: {
		focus() {
			// MacOS FireFox and Safari do not focus when clicked
			this.$refs.input.focus();
		},
		checkEvent() {
			this.checked = this.input.checked;
		}
	},
	mounted() {
		this.input = this.$refs.input;
		this.checkEvent();
	}
};
</script>
