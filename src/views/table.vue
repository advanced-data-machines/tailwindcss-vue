<template>
	<section class="px-4 w-full">
		<h1 class="text-3xl text-primary-300">Table</h1>
		<tv-table :data="data" :columns="columns" :custom-row-class="handleCustomRow">
			<template slot="header" slot-scope="props">
				{{ props.column.field }} {{ props.index }}
			</template>
		</tv-table>
		<tv-table :data="data" detailed>
			<template slot-scope="props">
				<tv-table-column label="Name" field="name">
					<template slot="header" slot-scope="child">
						<span class="text-danger-500">{{ child.column.field }} {{ child.index }}</span>
					</template>
					{{ props.row.name }}
				</tv-table-column>
				<tv-table-column label="Department" field="department">
					<template slot="header" slot-scope="child">
						{{ child.column.field }} {{ child.index }}
					</template>
					{{ props.row.department }}
				</tv-table-column>
			</template>
			<div slot="detail" class="p-5 border-b border-gray-300" slot-scope="detail">
				<strong>Department:</strong> {{ detail.row.department }}
			</div>
		</tv-table>
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
	},
	methods: {
		handleCustomRow(obj, index) {
			if (index % 2) return 'bg-info-100 hover:bg-gray-200';
			else return 'hover:bg-gray-100';
		}
	}
};
</script>
