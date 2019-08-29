<template>
	<table :class="currentClass">
		<thead>
			<tr>
				<th v-for="(column, index) in columns" :key="index">
					{{ column.label }}
				</th>
			</tr>
		</thead>
		<tbody>
			<template v-for="(row, index) in data">
				<tr :key="index" class="hover:bg-gray-100">
					<tv-table-column v-for="column in newColumns" :key="column.field">
						{{ getValueByPath(row, column.field) }}
					</tv-table-column>
				</tr>
			</template>
		</tbody>
	</table>
</template>
<script>
import { getValueByPath } from '../../utils/utils.js';
import ThemeMixin from '../../mixins/theme.js';
import TvTableColumn from './table-column.vue';
export default {
	name: 'TvTable',
	components: {
		'tv-table-column': TvTableColumn
	},
	mixins: [ThemeMixin],
	props: {
		data: {
			type: Array,
			default: () => []
		},
		columns: {
			type: Array,
			default: () => []
		}
	},
	data() {
		return {
			newData: this.data,
			newColumns: this.columns
		};
	},
	computed: {
		currentClass() {
			const tag = this.$options._componentTag;
			const theme = this.currentTheme;
			let classes = [
				tag,
				theme.base
			];
			return classes;
		}
	},
	watch: {
		data(value) {
			// save newColumns before resetting
			const newColumns = this.newColumns;
			this.newColumns = [];
			this.newData = value;
			// prevent table from being headless, data could change and created hook
			// on column might not trigger
			this.$nextTick(() => {
				if (!this.newColumns.length) this.newColumns = newColumns;
			});
		},
		columns(value) {
			this.newColumns = value;
		}
	},
	methods: {
		getValueByPath(obj, path) {
			return getValueByPath(obj, path);
		}
	}
};
</script>
