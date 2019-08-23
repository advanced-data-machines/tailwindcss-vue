<template>
	<section>
		<h1 class="text-danger-500">This is an about page</h1>
		<tv-button variant="primary">Test</tv-button>
		<tv-form ref="form" :model="test" :rules="rules" @submit.prevent>
			<tv-form-group prop="name">
				<tv-input name="test" class="resize-none" v-model="test.name" />
			</tv-form-group>
			<tv-form-group prop="city">
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
	name: 'About',
	data() {
		return {
			cities: ['Denver', 'Parker', 'Franktown'],
			test: {
				name: 'bart',
				city: ''
			},
			variants: ['default', 'primary', 'success', 'warning', 'danger', 'info'],
			rules: {
				name: [
					{ required: true, message: 'Please insert name', trigger: 'change' }
				],
				city: [
					{ required: true, message: 'Please select one', trigger: 'change' }
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
