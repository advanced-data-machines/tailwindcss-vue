<template>
	<form :class="currentClass">
		<slot />
	</form>
</template>
<script>
import { isEmpty, objectAssign } from '../../utils/utils.js';
import ThemeMixin from '../../mixins/theme.js';
export default {
	name: 'TvForm',
	mixins: [ThemeMixin],
	provide() {
		return {
			rootForm: this
		};
	},
	props: {
		model: {
			default: () => {},
			type: Object
		},
		rules: {
			default: () => {},
			type: Object
		},
		showMessage: {
			type: Boolean,
			default: true
		},
		validateOnRuleChange: {
			type: Boolean,
			default: true
		},
		loading: {
			type: Boolean,
			default: false
		},
		hideRequiredAsterisk: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			groups: []
		};
	},
	computed: {
		currentClass() {
			const tag = this.$options._componentTag;
			const theme = this.currentTheme;
			let classes = [
				tag,
				theme.base
			];
			return classes;
		}
	},
	watch: {
		rules() {
			// remove then add event listeners on form-item after form rules change
			this.fields.forEach(field => {
				field.removeValidateEvents();
				field.addValidateEvents();
			});
			// validate with new rules
			if (this.validateOnRuleChange) {
				this.validate(() => {});
			}
		}
	},
	created() {
		this.$on('form.addGroup', (group) => {
			if (!isEmpty(group)) {
				this.groups.push(group);
			}
		});
		this.$on('form.removeGroup', (group) => {
			if (group.prop) {
				this.groups.splice(this.groups.indexOf(group), 1);
			}
		});
	},
	methods: {
		validate(callback) {
			if (isEmpty(this.model)) {
				console.warn('(TV Warn[Form]) - model prop is required for validate to work - v-model="{YOUR_MODEL}"');
				return;
			}

			let promise;
			// if no callback, return promise
			if (typeof callback !== 'function' && window.Promise) {
				promise = new window.Promise((resolve, reject) => {
					callback = function(valid) {
						valid ? resolve(valid) : reject(valid);
					};
				});
			}
			let valid = true;
			let count = 0;

			if (this.groups.length === 0 && callback) {
				callback(valid);
			}
			let invalidGroups = {};
			this.groups.forEach(field => {
				field.validate('', (message, field) => {
					if (message) {
						valid = false;
					}
					invalidGroups = objectAssign({}, invalidGroups, field);
					if (typeof callback === 'function' && ++count === this.groups.length) {
						callback(valid, invalidGroups);
					}
				});
			});
			if (promise) {
				return promise;
			}
		}
	}
};
</script>
