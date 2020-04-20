<template>
	<section class="px-4 w-full">
		<h1 class="text-3xl text-teal-300">Table</h1>
		<tv-table
			:data="data"
			:columns="columns"
			:custom-row-class="handleCustomRow"
			resizable
			@resize-move="handleResizeMove"
			@scroll-height="handleScrollSize"
		>
			<template slot="header" slot-scope="props">
				{{ props.column.field }} {{ props.index }}
			</template>
		</tv-table>
		<tv-table :data="data2"
			:columns="columns"
			:loading="loading"
			detailed
			:checked-rows.sync="checkedRows"
			show-checkbox
			show-header-checkbox
			paginated
			:per-page="paging.perPage"
			:current-page="paging.current"
			pagination-location="both"
			checkbox-position="left"
		>
			<template slot-scope="props">
				<td :class="props.tdClass">
					{{ props.row.name }}
				</td>
				<td :class="props.tdClass">
					<template slot="header" slot-scope="child">
						{{ child.column.field }} {{ child.index }}
					</template>
					{{ props.row.department }}
				</td>
			</template>
			<div slot="detail" class="p-5 border-b border-gray-300" slot-scope="detail">
				<strong>Department:</strong> {{ detail.row.department }}
			</div>
			<template slot="previous">
				<tv-icon icon="chevron-left" />
			</template>
			<template slot="next">
				<tv-icon icon="chevron-right" />
			</template>
		</tv-table>
		<p>Checked Rows:</p>
		<code>{{ checkedRows }}</code>
	</section>
</template>
<script>
export default {
	name: 'Table',
	data() {
		return {
			data: [],
			data2: [],
			columns: [
				{ label: 'Name', field: 'name', sortable: true },
				{ label: 'Department', field: 'department', sortable: true }
			],
			paging: {
				current: 1,
				perPage: 2
			},
			checkedRows: [],
			loading: true
		};
	},
	methods: {
		handleCustomRow(obj, index) {
			if (index % 2) return 'bg-info-100 hover:bg-gray-200';
			else return 'hover:bg-gray-100';
		},
		handleResizeMove(e) {
			console.log(e);
		},
		handleScrollSize(e) {
			console.log(e);
		}
	},
	created() {
		setTimeout(() => {
			this.data = [
				{ name: 'Joe', department: 'HR', email: 'joe@tailwind-vue.com' },
				{ name: 'Andrew', department: 'Marketing', email: 'andrew@tailwind-vue.com' },
				{ name: 'Britany', department: 'Accounting', email: 'Britany@tailwind-vue.com' },
				{ name: 'Lisa', department: 'Sales', email: 'lisa@tailwind-vue.com' }
			];
			this.data2 = [
				{ name: 'Joe', department: 'HR', email: 'joe@tailwind-vue.com' },
				{ name: 'Andrew', department: 'Marketing', email: 'andrew@tailwind-vue.com' },
				{ name: 'Britany', department: 'Accounting', email: 'Britany@tailwind-vue.com' },
				{ name: 'Lisa', department: 'Sales', email: 'lisa@tailwind-vue.com' }
			];
			this.loading = false;
		}, 300);
	}
};
</script>
