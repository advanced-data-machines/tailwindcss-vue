<template>
	<table :class="currentClass">
		<thead>
			<tr>
				<tv-table-header v-if="detailed" :column="{ label: '' }" class="w-1" />
				<tv-table-header v-for="(column, index) in newColumns" :column="column" :key="index">
					<template v-if="column.$scopedSlots && column.$scopedSlots['header']">
						<tv-slot-component :component="column" :scoped="true" name="header" tag="span" :props="{ column, index }" />
					</template>
					<template v-else-if="$scopedSlots['header']">
						<slot name="header" :column="column" :index="index" />
					</template>
				</tv-table-header>
				<tv-table-header v-if="showCheckbox" :column="{ label: '' }" class="w-1">
					<tv-checkbox v-if="showHeaderCheckbox" :value="isAllChecked" :disabled="isAllUncheckable" @change.native="checkAll" :indeterminate="isIndeterminate" />
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
					<tv-table-column v-if="showCheckbox" internal>
						<tv-checkbox :disabled="!isRowCheckable(row)" :value="isRowChecked(row)" @change.native="checkRow(row)" @click.native.stop />
					</tv-table-column>
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
import { getValueByPath, indexOf } from '../../utils/utils.js';
import ThemeMixin from '../../mixins/theme.js';
import TvTableColumn from './table-column.vue';
import TvTableHeader from './table-header.vue';
import TvSlotComponent from '../slot/slot-component.js';
import TvTableArrow from './table-arrow.vue';
import TvCheckbox from '../checkbox/checkbox.vue';
export default {
	name: 'TvTable',
	components: {
		'tv-table-column': TvTableColumn,
		'tv-table-header': TvTableHeader,
		'tv-slot-component': TvSlotComponent,
		'tv-table-arrow': TvTableArrow,
		'tv-checkbox': TvCheckbox
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
		},
		showCheckbox: {
			type: Boolean,
			default: false
		},
		showHeaderCheckbox: {
			type: Boolean,
			default: false
		},
		checkedRows: {
			type: Array,
			default: () => []
		},
		customRowChecked: {
			type: Function,
			default: undefined
		},
		isRowCheckable: {
			type: Function,
			default: () => true
		}
	},
	data() {
		return {
			newData: this.data,
			newColumns: [...this.columns],
			newCheckedRows: [...this.checkedRows],
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
		},
		isAllChecked() {
			const checkableRows = this.data.filter((row) => this.isRowCheckable(row));
			if (checkableRows.length === 0) return false;
			const unchecked = checkableRows.some((current) => {
				return indexOf(this.newCheckedRows, current, this.customIsChecked) < 0;
			});
			return !unchecked;
		},
		isAllUncheckable() {
			const checkableRows = this.data.filter((row) => this.isRowCheckable(row));
			return checkableRows.length === 0;
		},
		isIndeterminate() {
			return this.newCheckedRows.length > 0 && this.data.length > this.newCheckedRows.length;
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
		},
		checkedRows(value) {
			this.newCheckedRows = [...value];
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
			// sync 'openedDetails'
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
		},
		isRowChecked(obj) {
			return indexOf(this.newCheckedRows, obj, this.customRowChecked) > -1;
		},
		checkRow(obj) {
			if (!this.isRowChecked(obj)) {
				this.newCheckedRows.push(obj);
			} else {
				this.removeCheckedRow(obj);
			}
			// sync 'checkedRows'
			this.$emit('update:checkedRows', this.newCheckedRows);
		},
		removeCheckedRow(obj) {
			const index = indexOf(this.newCheckedRows, obj, this.customRowChecked);
			if (index > -1) {
				this.newCheckedRows.splice(index, 1);
			}
		},
		checkAll() {
			const allChecked = this.isAllChecked;
			this.data.forEach((current) => {
				this.removeCheckedRow(current);
				if (!allChecked) {
					if (this.isRowCheckable(current)) {
						this.newCheckedRows.push(current);
					}
				}
			});
			this.$emit('update:checkedRows', this.newCheckedRows);
		}
	}
};
</script>
