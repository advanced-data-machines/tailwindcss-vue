<template>
	<label ref="label" :class="[{ 'asterisk': !hideRequiredAsterisk && isRequired }, currentClass]">
		<slot />
	</label>
</template>
<script>
import ThemeMixin from '../../mixins/theme.js';
export default {
	name: 'TvLabel',
	mixins: [ThemeMixin],
	inject: {
		rootForm: {
			default: ''
		},
		formGroup: {
			default: ''
		}
	},
	computed: {
		validateState() {
			let state = this.formGroup ? this.formGroup.validateState : '';
			if (state === 'success' && !this.showSuccessState) state = 'default';
			return state;
		},
		showSuccessState() {
			return this.formGroup.showSuccessState;
		},
		hideRequiredAsterisk() {
			return (this.rootForm || {}).hideRequiredAsterisk;
		},
		isRequired() {
			return (this.formGroup || {}).isRequired;
		},
		currentClass() {
			const tag = this.$options._componentTag;
			const theme = this.currentTheme;
			const state = this.validateState || 'default';
			return [
				tag,
				`${tag}-state-${state}`,
				this.isRequired ? `${tag}-required` : '',
				theme.base,
				`${theme.state[state]}`
			];
		}
	}
};
</script>
<style>
	label.asterisk:before {
		content: '*'
	}
</style>
