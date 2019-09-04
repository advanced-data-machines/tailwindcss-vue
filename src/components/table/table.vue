<template>
	<table :class="currentClass">
		<thead>
			<tr>
				<tv-table-header v-if="detailed" :column="{label: ''}" class="w-1" />
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
				<tr :class="handleCustomRowClass(row, index)" :key="customRowKey ? row[customRowKey] : index">
					<tv-table-column v-if="detailed" internal>
						<slot name="arrow" :opened="isDetailActive">
							<tv-table-arrow @click="toggleDetail(row)" :opened="isDetailActive(row)" />
						</slot>
					</tv-table-column>
					<slot v-if="$scopedSlots['default']" :row="row" :index="index" />
					<template v-else>
						<tv-table-column v-for="column in newColumns" :key="column.field" v-bind="column" internal>
							<span v-if="column.renderHtml" v-html="getValueByPath(row, column.field)" />
							<template v-else>
								{{ getValueByPath(row, column.field) }}
							</template>
						</tv-table-column>
					</template>
				</tr>
				<tr :key="(customRowKey ? row[customRowKey] : index) + '-detail'" v-if="isDetailActive(row)">
					<td colspan="100">
						<slot name="detail" :row="row" :index="index" />
					</td>
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
import TvTableArrow from './table-arrow.vue';
export default {
	name: 'TvTable',
	components: {
		'tv-table-column': TvTableColumn,
		'tv-table-header': TvTableHeader,
		'tv-slot-component': TvSlotComponent,
		'tv-table-arrow': TvTableArrow
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
		},
		customRowClass: {
			type: [Function, String],
			default: 'hover:bg-gray-100'
		},
		detailed: {
			type: Boolean,
			default: false
		},
		openedDetails: {
			type: Array,
			default: () => []
		},
		detailKey: {
			type: String,
			default: ''
		}
	},
	data() {
		return {
			newData: this.data,
			newColumns: [...this.columns],
			visibleDetails: []
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
		handleCustomRowClass(obj, index) {
			if (typeof this.customRowClass === 'function') {
				return this.customRowClass.apply(null, [obj, index]);
			}
			return this.customRowClass;
		},
		getValueByPath(obj, path) {
			return getValueByPath(obj, path);
		},
		toggleDetail(obj) {
			const included = this.isVisibleDetail(obj);
			if (included) {
				this.handleCloseDetail(obj);
			} else {
				this.handleOpenDetail(obj);
			}
			// sync openedDetails
			this.$emit('update:openedDetails', this.visibleDetails);
		},
		handleCloseDetail(obj) {
			const index = this.handleDetailKey(obj);
			const result = this.visibleDetails.indexOf(index);
			this.visibleDetails.splice(result, 1);
		},
		handleOpenDetail(obj) {
			const index = this.handleDetailKey(obj);
			this.visibleDetails.push(index);
		},
		isVisibleDetail(obj) {
			const index = this.handleDetailKey(obj);
			return this.visibleDetails.indexOf(index) > -1;
		},
		handleDetailKey(obj) {
			const key = this.detailKey;
			return (!key && !key.length) ? obj : obj[key];
		},
		isDetailActive(obj) {
			return this.detailed && this.isVisibleDetail(obj);
		}
	}
};
</script>
