<template>
	<section class="px-4 w-full">
		<h1 class="text-3xl text-teal-300">Progress Bar</h1>
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
				return 'bg-red-800';
			} else if (val < 40) {
				return 'bg-red-600';
			} else if (val < 60) {
				return 'bg-yellow-600';
			} else if (val < 80) {
				return 'bg-yellow-400';
			} else if (val < 90) {
				return 'bg-green-400';
			} else if (val < 100) {
				return 'bg-green-600';
			} else {
				return 'bg-green-800';
			}
		}
	}
};
</script>
