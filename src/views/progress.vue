<template>
	<section class="px-4 w-full">
		<h1 class="text-3xl text-primary-300">Progress Bar</h1>
		<tv-progress :value="progress" class="mb-2" v-for="(variant, index) in variants" :key="index" :variant="variant" />
		<tv-progress :value="progress" class="mb-2" size="sm" :show-value="false" :custom-variant-class="handleCustomVarient" />
		<tv-button @click="handleProgress">Set Progress</tv-button>
	</section>
</template>
<script>
export default {
	name: 'Progress',
	data() {
		return {
			progress: 90,
			variants: ['default', 'primary', 'success', 'warning', 'danger', 'info']
		};
	},
	methods: {
		handleProgress() {
			this.progress = Math.round(Math.random() * 100);
		},
		handleCustomVarient(val) {
			if (val < 20) {
				return 'bg-danger-800';
			} else if (val < 40) {
				return 'bg-danger-600';
			} else if (val < 60) {
				return 'bg-warning-600';
			} else if (val < 80) {
				return 'bg-warning-400';
			} else if (val < 90) {
				return 'bg-success-400';
			} else if (val < 100) {
				return 'bg-success-600';
			} else {
				return 'bg-success-800';
			}
		}
	}
};
</script>
