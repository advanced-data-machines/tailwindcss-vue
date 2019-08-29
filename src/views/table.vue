<template>
	<section class="px-4 w-full">
		<h1 class="text-3xl text-primary-300">Table</h1>
		<tv-table :data="data" :columns="columns" />
	</section>
</template>
<script>
export default {
	name: 'Table',
	data() {
		return {
			data: [
				{ name: 'Joe', department: 'HR', email: 'joe@tailwind-vue.com' },
				{ name: 'Andrew', department: 'Marketing', email: 'andrew@tailwind-vue.com' },
				{ name: 'Britany', department: 'Accounting', email: 'Britany@tailwind-vue.com' },
				{ name: 'Lisa', department: 'Sales', email: 'lisa@tailwind-vue.com' }
			],
			columns: [
				{ label: 'Name', field: 'name' },
				{ label: 'Department', field: 'department' }
			]
		};
	}
};
</script>
