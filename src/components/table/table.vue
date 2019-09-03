<template>
	<table :class="currentClass">
		<thead>
			<tr>
				<tv-table-header v-for="(column, index) in newColumns" :column="column" :key="index">
					<template v-if="column.$scopedSlots && column.$scopedSlots['header']">
						<tv-slot-component :component="column" :scoped="true" name="header" tag="span" :props="{ column, index }" />
					</template>
					<template v-else-if="$scopedSlots['header']">
						<slot name="header" :column="column" :index="index" />
					</template>
				</tv-table-header>
			</tr>
		</thead>
		<tbody>
			<template v-for="(row, index) in data">
				<tr :key="customRowKey ? row[customRowKey] : index" class="hover:bg-gray-100">
					<slot v-if="$scopedSlots['default']" :row="row" />
					<template v-else>
						<tv-table-column v-for="column in newColumns" :key="column.field" v-bind="column" internal>
							<span v-if="column.renderHtml" v-html="getValueByPath(row, column.field)" />
							<template v-else>
								{{ getValueByPath(row, column.field) }}
							</template>
						</tv-table-column>
					</template>
				</tr>
			</template>
		</tbody>
	</table>
</template>
<script>
import { getValueByPath } from '../../utils/utils.js';
import ThemeMixin from '../../mixins/theme.js';
import TvTableColumn from './table-column.vue';
import TvTableHeader from './table-header.vue';
import TvSlotComponent from '../slot/slot-component.js';
export default {
	name: 'TvTable',
	components: {
		'tv-table-column': TvTableColumn,
		'tv-table-header': TvTableHeader,
		'tv-slot-component': TvSlotComponent
	},
	provide() {
		return {
			tableColumns: this.newColumns
		};
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
		},
		customRowKey: {
			type: String,
			default: undefined
		}
	},
	data() {
		return {
			newData: this.data,
			newColumns: [...this.columns]
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
			this.newColumns = [...value];
		}
	},
	methods: {
		getValueByPath(obj, path) {
			return getValueByPath(obj, path);
		}
	},
	mounted() {
		console.log(this.$slots, this.$scopedSlots);
	}
};
</script>
