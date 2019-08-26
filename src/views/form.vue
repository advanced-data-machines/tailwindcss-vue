<template>
	<section class="px-4 w-full">
		<h1 class="text-3xl text-primary-300">Form</h1>
		<tv-alert :active.sync="active" auto-close v-for="variant in variants" :variant="variant" :key="variant + '2'">Alert</tv-alert>
		<tv-form class="w-full max-w-xl" ref="form" :model="test" :rules="rules" @submit.prevent>
			<tv-form-group prop="name" :theme-override="custom">
				<tv-label>Name</tv-label>
				<tv-input name="test" class="resize-none" v-model="test.name" />
			</tv-form-group>
			<tv-form-group prop="city">
				<tv-label>City</tv-label>
				<tv-select v-model="test.city" placeholder="Select a City">
					<option v-for="city in cities" :value="city" :key="city" :disabled="city === 'Franktown'">
						{{ city }}
					</option>
				</tv-select>
			</tv-form-group>
			<tv-button @click="active = true">Submit</tv-button>
		</tv-form>
		<code>{{ test.city }}</code>
		<br>
		<tv-button @click="notify">Notify</tv-button>
		<tv-button v-for="variant in variants" disabled :variant="variant" :key="variant" class="mr-2">{{ variant }}</tv-button>
	</section>
</template>
<script>
export default {
	name: 'Form',
	data() {
		return {
			cities: ['Denver', 'Parker', 'Franktown'],
			test: {
				name: '',
				city: ''
			},
			active: true,
			custom: {
				base: 'w-full mb-3'
			},
			variants: ['default', 'primary', 'success', 'warning', 'danger', 'info'],
			rules: {
				name: [
					{ required: true, message: 'Please insert name', trigger: 'change' }
				],
				city: [
					{ required: true, message: 'Please select a city', trigger: 'change' }
				]
			}
		};
	},
	methods: {
		validate() {
			this.$refs['form'].validate().then(() => {}, (error) => console.log(error));
		},
		notify() {
			this.$tailwindVue.notify('notify');
		}
	}
};
</script>
