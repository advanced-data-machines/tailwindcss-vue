<template>
	<section class="px-4 w-full">
		<h1 class="text-3xl text-teal-300">Form</h1>
		<tv-form class="w-full max-w-xl" ref="form" :model="test" :rules="rules" @submit.prevent>
			<tv-form-group prop="name" :theme-override="custom">
				<tv-label>Name</tv-label>
				<tv-input name="test" size="sm" class="resize-none" v-model="test.name" />
			</tv-form-group>
			<tv-form-group prop="name" :theme-override="custom">
				<tv-label>Name</tv-label>
				<tv-input name="test" class="resize-none" v-model="test.name" />
			</tv-form-group>
			<tv-form-group prop="name" :theme-override="custom">
				<tv-label>Name</tv-label>
				<tv-input name="test" size="lg" class="resize-none" v-model="test.name" />
			</tv-form-group>
			<tv-form-group prop="city">
				<tv-label>City</tv-label>
				<tv-select v-model="test.city" placeholder="Select a City">
					<option v-for="city in cities" :value="city" :key="city" :disabled="city === 'Franktown'">
						{{ city }}
					</option>
				</tv-select>
			</tv-form-group>
			<tv-form-group>
				<tv-checkbox v-for="city in cities" :key="city + 'check'" v-model="test.checked" :native-value="city">
					{{ city }}
				</tv-checkbox>
			</tv-form-group>
			<tv-form-group>
				<p>
					<tv-switch v-model="trueValue" size="sm" :native-value="trueValue" true-value="test" false-value="notest">
						{{ trueValue }}
					</tv-switch>
				</p>
				<p>
					<tv-switch v-model="switchValue" disabled>
						disabled
					</tv-switch>
				</p>
				<p>
					<tv-switch v-model="switchValue" size="lg" @input="handleChange()">
						{{ switchValue }}
					</tv-switch>
				</p>
			</tv-form-group>
			<tv-form-group>
				<tv-switch v-for="city in cities" :key="city + 'switch'" v-model="test.checked" :native-value="city" class="">
					<span class="ml-3">{{ city }}</span>
				</tv-switch>
			</tv-form-group>
			<tv-button @click="validate" rounded>Submit</tv-button>
		</tv-form>
		<p>Checked:</p>
		<code>{{ test.checked }}</code>
		<p>Selected:</p>
		<code>{{ test.city }}</code>
		<br>
		<tv-button v-for="variant in variants" disabled :variant="variant" :key="variant" class="mr-2 mb-2">{{ variant }}</tv-button>
		<br>
		<tv-button @click="notify" size="lg" class="mr-2" rounded square>
			<tv-icon icon="message" wrap-icon class="h-5 w-5" />
		</tv-button>
		<tv-button @click="handleShow" class="mr-2">
			<tv-icon icon="message" /> Inline Modal
		</tv-button>
		<tv-button @click="show = true" size="sm" class="text-teal-300">
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
export default {
	name: 'Form',
	components: {
		'modal-test': ModalTest
	},
	data() {
		return {
			cities: ['Denver', 'Parker', 'Franktown'],
			test: {
				name: '',
				city: '',
				checked: []
			},
			active: true,
			custom: {
				base: 'w-full mb-3'
			},
			variants: ['default', 'primary', 'success', 'warning', 'danger', 'info'],
			rules: {
				name: [
					{ required: true, message: 'Please insert name', trigger: 'change' },
					{ whitespace: true, type: 'string', message: 'Please insert name', trigger: 'change' }
				],
				city: [
					{ required: true, message: 'Please select a city', trigger: 'change' }
				]
			},
			show: false,
			showTwo: false,
			switchValue: false,
			trueValue: 'test'
		};
	},
	methods: {
		validate() {
			this.$refs['form'].validate().then(() => {}, (error) => console.log(error));
		},
		notify() {
			this.$tailwindVue.notify({
				position: 'top-right',
				message: 'Notify',
				variant: 'info'
			});
		},
		handleShow() {
			this.$tailwindVue.modal({
				component: ModalTest,
				bgStyle: 'bg-blue-900 opacity-75'
			});
		},
		handleCancel(type, args) {
			console.log(`Test Args: ${args}`);
		},
		handleChange() {
			alert('Switched clicked');
		}
	}
};
</script>
