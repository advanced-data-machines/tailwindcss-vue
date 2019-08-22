<template>
	<label :class="[{ 'asterisk': !hideRequiredAsterisk }, currentClass]">
		<slot />
	</label>
</template>
<script>
export default {
	name: 'TvLabel',
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
			const theme = this.$tvTheme[this.$options.name];
			const state = this.validateState || 'default';
			// add tags first
			let classes = [
				tag,
				`${tag}-state-${state}`,
				this.isRequired ? `${tag}-required` : ''
			];
			// base theme classes
			classes.push(theme.base);
			// size theme classes
			// else add normal state classes
			classes.push(`${theme.state[state]}`);
			return classes;
		}
	}
};
</script>
<style>
	label.asterisk:before {
		content: '*'
	}
</style>
