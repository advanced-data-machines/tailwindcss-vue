<template>
	<label
		ref="label"
		role="checkbox"
		:class="currentClass"
		@click="focus"
		@keydown.prevent.enter="$refs.label.click()"
	>
		<!-- toggle -->
		<div class="relative">
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
			<div class="toggle__line w-10 h-4 bg-gray-400 rounded-full shadow-inner"
				:style="isDisabled ? 'cursor: no-drop' : ''"
			/>
			<!-- dot -->
			<div class="toggle__dot absolute w-6 h-6 bg-white rounded-full shadow"
				:style="isDisabled ? 'cursor: no-drop' : ''"
			/>
		</div>
		<span>
			<slot />
		</span>
	</label>
</template>
<style>
.toggle__dot {
	top: -.25rem;
	left: -.25rem;
	transition: all 0.3s ease-in-out;
}

input:checked ~ .toggle__dot {
  transform: translateX(100%);
}

input:checked ~ .toggle__line {
	background-color: #48bb48;
}
</style>
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
			// base theme classes
			classes.push(theme.base);
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
		},
		checkEvent(e) {
			this.checked = e.target.checked;
		}

	}
};
</script>
