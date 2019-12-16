<template>
	<section class="px-4 w-full">
		<h1 class="text-3xl text-teal-300">Modal</h1>
		<tv-button @click="show = true" class="mr-2">
			<tv-icon icon="message" /> Inline Modal
		</tv-button>
		<tv-button @click="handleShow" size="sm" class="text-teal-300">
			<tv-icon icon="message" /> Programmatic Modal
		</tv-button>
		<tv-modal :active.sync="show" :on-cancel="handleCancel">
			<modal-test />
			<template slot="close" slot-scope="props">
				<a @click="props.cancel('x')" class="cursor-pointer pointer-events-auto absolute right-0 top-0 p-4" :aria-label="props.ariaCloseLabel">
					<svg class="fill-current h-6 w-6 text-yellow-400" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
				</a>
			</template>
		</tv-modal>
	</section>
</template>
<script>
import ModalTest from './modal-test.vue';
import ModalConfirm from './modal-confirm.vue';
export default {
	name: 'Modal',
	components: {
		'modal-test': ModalTest
	},
	data() {
		return {
			show: false,
			showTwo: false
		};
	},
	methods: {
		handleShow() {
			this.$tailwindVue.modal({
				parent: this,
				component: ModalConfirm,
				canCancel: true,
				props: {
					content: 'Testing!'
				},
				onConfirm: (args) => {
					console.log(args);
				}
			});
		},
		handleCancel(type, args) {
			console.log(`Test Args: ${args}`);
		}
	}
};
</script>
