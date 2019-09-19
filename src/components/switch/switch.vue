<template>
	<label
		ref="label"
		role="checkbox"
		:class="currentClass"
		@click="focus"
		@keydown.prevent.enter="$refs.label.click()"
	>
		<!-- toggle -->
		<div class="relative flex items-center">
			<!-- input -->
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
			<!-- line -->
			<div :class="LineClass"	/>
			<!-- dot -->
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
			const tag = this.$options._componentTag;
			const theme = this.currentTheme;
			// add tags first
			let classes = [
				tag,
				theme.base
			];
			return classes;
		},
		dotClass() {
			const tag = `${this.$options._componentTag}-dot`;
			const theme = this.currentTheme;
			const size = this.size || 'default';
			const state = this.checked ? 'checked' : 'unchecked';
			let classes = [
				tag,
				`${tag}-size-${size}`,
				`${tag}-state-${state}`,
				this.isDisabled ? `${tag}-disabled` : ''
			];

			// base theme classes
			classes.push(theme.dot.base);
			// size theme classes
			classes.push(theme.dot.size[size]);
			if (this.isDisabled) {
				classes.push(theme.dot.disabled[state]);
			} else {
				classes.push(theme.dot.normal[state]);
			}
			return classes;
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
			const tag = `${this.$options._componentTag}-line`;
			const theme = this.currentTheme;
			const size = this.size || 'default';
			const state = this.checked ? 'checked' : 'unchecked';
			let classes = [
				tag,
				`${tag}-size-${size}`,
				`${tag}-state-${state}`,
				this.isDisabled ? `${tag}-disabled` : ''
			];

			// base theme classes
			classes.push(theme.line.base);
			// size theme classes
			classes.push(theme.line.size[size]);
			if (this.isDisabled) {
				classes.push(theme.line.disabled[state]);
			} else {
				classes.push(theme.line.normal[state]);
			}
			return classes;
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
