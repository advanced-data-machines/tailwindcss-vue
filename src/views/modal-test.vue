<template>
	<div class="bg-white p-5 rounded shadow w-full max-w-xl">
		Hello Content <br>
		<tv-button @click="handleCancel">
			Cancel
		</tv-button>
	</div>
</template>
<script>
export default {
	name: 'ModalTest',
	inject: ['closeModal', 'cancelModal'],
	methods: {
		handleCancel() {
			this.cancelModal('button', 'test', 'testing');
		}
	},
	created() {
		console.log('Hello, World');
	}
};
</script>
