<template>
	<div :class="currentClass">
		<slot name="label" v-if="$slots.label" :label="label" />
		<slot />
		<slot v-if="validateState === 'error' && showMessage && form.showMessage" name="error" :error="validateMessage">
			<span class="block">
				{{ validateMessage }}
			</span>
		</slot>
	</div>
</template>
<script>
import AsyncValidator from 'async-validator';
import Emitter from '../../mixins/emitter.js';
import { getPropByPath, objectAssign, noop } from '../../utils/utils.js';
export default {
	name: 'TvFormGroup',
	mixins: [Emitter],
	provide() {
		return {
			formGroup: this
		};
	},
	inject: ['rootForm'],
	props: {
		prop: {
			type: String,
			default: ''
		},
		required: {
			type: Boolean,
			default: undefined
		},
		rules: {
			type: [Object, Array],
			default: () => {}
		},
		error: {
			type: String,
			default: null
		},
		validateStatus: {
			type: String,
			default: ''
		},
		showMessage: {
			type: Boolean,
			default: true
		},
		showSuccessState: {
			type: Boolean,
			default: false
		},
		label: {
			type: String,
			default: null
		}
	},
	watch: {
		error: {
			immediate: true,
			handler(value) {
				this.validateMessage = value;
				this.validateState = value ? 'error' : '';
			}
		},
		validateStatus(value) {
			this.validateState = value;
		}
	},
	computed: {
		currentClass() {
			const tag = this.$options._componentTag;
			const theme = this.$tvTheme[this.$options.name];
			const state = this.validateState || 'default';
			// add tags first
			let classes = [
				tag,
				`${tag}-state-${state}`,
				this.isRequired ? `${tag}-required` : '',
				theme.base
			];
			return classes;
		},
		form() {
			let parent = this.$parent;
			let parentName = parent.$options.name;
			while (parentName !== 'TvForm') {
				parent = parent.$parent;
				parentName = parent.$options.name;
			}
			return parent;
		},
		groupValue() {
			const model = this.form.model;
			if (!model || !this.prop) { return; }
			let path = this.prop;
			if (path.indexOf(':') !== -1) {
				path = path.replace(/:/, '.');
			}
			return getPropByPath(model, path, true).v;
		},
		isRequired() {
			let rules = this.getRules();
			let isRequired = false;
			if (rules && rules.length) {
				rules.every(rule => {
					if (rule.required) {
						isRequired = true;
						return false;
					}
					return true;
				});
			}
			return isRequired;
		}
	},
	data() {
		return {
			validateState: '',
			validateMessage: '',
			validateDisabled: true
		};
	},
	methods: {
		validate(trigger, callback = noop) {
			this.validateDisabled = false;
			const rules = this.getFilteredRule(trigger);
			if ((!rules || rules.length === 0) && this.required === undefined) {
				callback();
				return true;
			}
			this.validateState = 'default';
			const descriptor = {};
			if (rules && rules.length > 0) {
				rules.forEach(rule => {
					delete rule.trigger;
				});
			}
			descriptor[this.prop] = rules;
			const validator = new AsyncValidator(descriptor);
			const model = {};
			model[this.prop] = this.groupValue;
			validator.validate(model, { firstGroups: true }, (errors, invalidGroups) => {
				this.validateState = !errors ? 'success' : 'error';
				this.validateMessage = errors ? errors[0].message : '';
				callback(this.validateMessage, invalidGroups);
				this.rootForm && this.rootForm.$emit('validate', this.prop, !errors, this.validateMessage || null);
			});
		},
		clearValidate() {
			this.validateState = '';
			this.validateMessage = '';
			this.validateDisabled = false;
		},
		getRules() {
			let formRules = this.form.rules;
			const selfRules = this.rules;
			const requiredRule = this.required !== undefined ? { required: !!this.required } : [];
			const prop = getPropByPath(formRules, this.prop || '');
			formRules = formRules ? (prop.o[this.prop || ''] || prop.v) : [];
			return [].concat(selfRules || formRules || []).concat(requiredRule);
		},
		getFilteredRule(trigger) {
			const rules = this.getRules();
			return rules.filter(rule => {
				if (!rule.trigger || trigger === '') return true;
				if (Array.isArray(rule.trigger)) {
					return rule.trigger.indexOf(trigger) > -1;
				} else {
					return rule.trigger === trigger;
				}
			}).map(rule => objectAssign({}, rule));
		},
		onGroupBlur() {
			if (this.form.loading) return;
			this.validate('blur');
		},
		onGroupChange() {
			if (this.form.loading) return;
			if (this.validateDisabled) {
				this.validateDisabled = false;
				return;
			}
			this.validate('change');
		},
		addValidateEvents() {
			const rules = this.getRules();
			if (rules.length || this.required !== undefined) {
				this.$on('form.blur', this.onGroupBlur);
				this.$on('form.change', this.onGroupChange);
			}
		},
		removeValidateEvents() {
			this.$off();
		}
	},
	mounted() {
		if (this.prop) {
			this.dispatch('TvForm', 'form.addGroup', [this]);
			let initialValue = this.groupValue;
			if (Array.isArray(initialValue)) {
				initialValue = [].concat(initialValue);
			}
			Object.defineProperty(this, 'initialValue', {
				value: initialValue
			});
			this.addValidateEvents();
		}
	},
	beforeDestroy() {
		this.dispatch('TvForm', 'form.removeGroup', [this]);
	}
};
</script>
