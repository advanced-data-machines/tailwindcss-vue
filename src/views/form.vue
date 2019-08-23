<template>
	<section class="px-4 w-full">
		<h1 class="text-3xl text-primary-300">Form</h1>
		<tv-form class="w-full max-w-xl" ref="form" :model="test" :rules="rules" @submit.prevent>
			<tv-form-group prop="name">
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
			<tv-button @click="validate">Submit</tv-button>
		</tv-form>
		<code>{{ test.cities }}</code>
		<br>
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
			this.$refs['form'].validate();
		}
	}
};
</script>
