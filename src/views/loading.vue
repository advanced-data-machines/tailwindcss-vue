<template>
	<section class="p-4 w-full">
		<div class="bg-gray-200 rounded w-full max-w-lg p-5 mb-4 relative" ref="well">
			This is my content in a well
			<tv-loading :active.sync="isLoading" :is-fullpage="isFullpage" can-cancel />
		</div>
		<tv-button @click="setLoading" :disabled="isLoading" class="mr-3">Activate</tv-button>
		<tv-button @click="setLoadingProgrammatic" class="mr-3">
			Programmatic Loading
		</tv-button>
		<tv-switch v-model="isFullpage">
			<span class="ml-3">Fullpage</span>
		</tv-switch>
	</section>
</template>
<script>
export default {
	name: 'Loading',
	data() {
		return {
			isLoading: false,
			isFullpage: false
		};
	},
	methods: {
		setLoading() {
			this.isLoading = true;
			setTimeout(() => {
				this.isLoading = false;
			}, 3000);
		},
		setLoadingProgrammatic() {
			const load = this.$tailwindVue.loading({
				container: this.isFullpage ? null : this.$refs.well
			});

			setTimeout(() => {
				load.close();
			}, 3000);
		}
	}
};
</script>
