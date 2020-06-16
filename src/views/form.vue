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
			<tv-form-group prop="myCity" :theme-override="custom">
				<tv-label>Autocomplete</tv-label>
				<tv-autocomplete v-model="test.myCity" :data="filteredDataArray" :max-height="55" @blur="handleBlur" select-on-click-out open-on-focus>
					<div slot="empty">No Matching Results</div>
				</tv-autocomplete>
			</tv-form-group>
			<tv-form-group prop="city">
				<tv-label>City</tv-label>
				<tv-select v-model="test.city" placeholder="Select a City" size="sm">
					<option v-for="city in cities" :value="city" :key="city" :disabled="city === 'Franktown'">
						{{ city }}
					</option>
				</tv-select>
			</tv-form-group>
			<tv-form-group prop="city">
				<tv-label>City</tv-label>
				<tv-select v-model="test.city" placeholder="Select a City">
					<option v-for="city in cities" :value="city" :key="city" :disabled="city === 'Franktown'">
						{{ city }}
					</option>
				</tv-select>
			</tv-form-group>
			<tv-form-group prop="city">
				<tv-label>City</tv-label>
				<tv-select v-model="test.city" placeholder="Select a City" size="lg">
					<option v-for="city in cities" :value="city" :key="city" :disabled="city === 'Franktown'">
						{{ city }}
					</option>
				</tv-select>
			</tv-form-group>
			<tv-form-group prop="checked">
				<tv-checkbox v-for="city in cities" :key="city + 'check'" v-model="test.checked" :native-value="city">
					{{ city }}
				</tv-checkbox>
			</tv-form-group>
			<tv-form-group prop="city">
				<tv-radio-button size="sm" v-for="city in cities" :key="city + 'radio'" v-model="test.city" :native-value="city">
					{{ city }}
				</tv-radio-button>
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
				<tv-switch v-for="city in cities" :key="city + 'switch'" v-model="test.checked" :native-value="city">
					<span class="ml-3">{{ city }}</span>
				</tv-switch>
			</tv-form-group>
			<tv-button class="mr-2" @click="validate" rounded>Submit</tv-button>
			<tv-button @click="cancel" variant="warning" rounded>Cancel</tv-button>
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
	</section>
</template>
<script>
import { isEmpty } from '../utils/utils';
export default {
	name: 'Form',
	computed: {
		filteredDataArray() {
			const test = this.test.myCity;
			return this.cities.filter((option) => {
				if (isEmpty(test)) return true;
				return option.toString().toLowerCase().indexOf(test.toLowerCase()) >= 0;
			});
		}
	},
	data() {
		return {
			cities: ['Denver', 'Parker', 'Franktown', 'New York', 'New Jersey'],
			test: {
				name: '',
				city: '',
				myCity: '',
				checked: []
			},
			seleced: '',
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
				],
				checked: [
					{ required: true, message: 'Please select a city', trigger: 'change' }
				]
			},
			switchValue: false,
			trueValue: 'test'
		};
	},
	methods: {
		validate() {
			this.$refs.form.validate().then(() => {}, (error) => console.log(error));
		},
		cancel() {
			this.$refs.form.reset();
		},
		notify() {
			this.$tailwindVue.notify({
				position: 'top-right',
				message: 'Notify',
				variant: 'info'
			});
		},
		handleChange() {
			alert('Switched clicked');
		},
		handleBlur() {
			console.log('blur');
		}
	}
};
</script>
