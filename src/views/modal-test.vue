<template>
	<div class="p-5">
		Hello Content <br>
		<tv-button @click="handleConfirm" variant="success" class="mr-2">
			Confirm
		</tv-button>
		<tv-button @click="handleCancel" variant="warning">
			Cancel
		</tv-button>
	</div>
</template>
<script>
export default {
	name: 'ModalTest',
	inject: ['confirmModal', 'cancelModal'],
	methods: {
		handleCancel() {
			this.cancelModal('button', 'test', 'testing');
		},
		handleConfirm() {
			this.confirmModal('testing123');
		}
	},
	created() {
		console.log('Hello, World');
	}
};
</script>
