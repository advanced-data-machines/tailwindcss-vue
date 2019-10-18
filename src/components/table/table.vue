<template>
	<div :class="{ 'overflow-x-auto': responsive }">
		<table :class="currentClass">
			<thead>
				<tr>
					<th v-if="detailed" :class="[thClass, 'w-1']"><span :class="detailToggleHrClass" /></th>
					<th v-for="(column, index) in newColumns" :key="index" @click="sort(column)" :class="[thClass, column && column.sortable ? 'cursor-pointer' : '', column.customHeaderClass ]">
						<div class="flex items-center">
							<template v-if="$scopedSlots['header']">
								<slot name="header" :column="column" :index="index" />
							</template>
							<template v-else>{{ column.label }}</template>
							<span :class="currentSortColumn === column ? 'visible': 'invisible'">
								<slot name="direction" :is-asc="isAsc">
									<svg class="fill-current text-gray-500 h-4 w-4 ml-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
										<path v-if="isAsc" d="M10.707 7.05L10 6.343 4.343 12l1.414 1.414L10 9.172l4.243 4.242L15.657 12z" />
										<path v-else d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
									</svg>
								</slot>
							</span>
						</div>
					</th>
					<th v-if="showCheckbox" :column="{ label: '' }" :class="[thClass, 'w-1']">
						<tv-checkbox v-if="showHeaderCheckbox" :value="isAllChecked" :disabled="isAllUncheckable" @change.native="checkAll" :indeterminate="isIndeterminate" />
					</th>
				</tr>
			</thead>
			<tbody v-if="newData.length > 0">
				<template v-for="(row, index) in visibleData">
					<tr :class="[trClass, handleCustomRowClass(row, index)]" :key="customRowKey ? row[customRowKey] : index">
						<td v-if="detailed" :class="tdClass">
							<slot name="arrow" :opened="isDetailActive">
								<tv-table-arrow @click="toggleDetail(row)" :opened="isDetailActive(row)" />
							</slot>
						</td>
						<slot v-if="$scopedSlots['default']" :row="row" :index="index" :td-class="tdClass" />
						<template v-else>
							<td v-for="column in newColumns" :key="column.field" :class="tdClass">
								<span v-if="column.renderHtml" v-html="getValueByPath(row, column.field)" />
								<template v-else>
									{{ getValueByPath(row, column.field) }}
								</template>
							</td>
						</template>
						<td v-if="showCheckbox" :class="tdClass">
							<tv-checkbox :disabled="!isRowCheckable(row)" :value="isRowChecked(row)" @change.native="checkRow(row)" @click.native.stop />
						</td>
					</tr>
					<tr :key="(customRowKey ? row[customRowKey] : index) + '-detail'" v-if="isDetailActive(row)">
						<td colspan="100">
							<slot name="detail" :row="row" :index="index" />
						</td>
					</tr>
				</template>
			</tbody>
			<tbody v-else>
				<tr :class="trClass">
					<slot name="no-data" :data="newData" :td-class="tdClass" :loading="loading">
						<td :class="tdClass" colspan="100">
							<span v-if="loading">Loading</span>
							<span v-else>No Matching Results</span>
						</td>
					</slot>
				</tr>
			</tbody>
		</table>
	</div>
</template>
<script>
import { getValueByPath, indexOf } from '../../utils/utils.js';
import ThemeMixin from '../../mixins/theme.js';
import TvTableArrow from './table-arrow.vue';
import TvCheckbox from '../checkbox/checkbox.vue';
export default {
	name: 'TvTable',
	components: {
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
			default: ''
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
		detailToggleHrClass: {
			type: String,
			default: 'w-5 inline-block' // prevent table size jump
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
		},
		backendSorting: {
			type: Boolean,
			default: false
		},
		defaultSortField: {
			type: String,
			default: undefined
		},
		defaultSortDirection: {
			type: String,
			default: 'asc' // assending
		},
		responsive: {
			type: Boolean,
			default: true
		},
		loading: {
			type: Boolean,
			default: false
		},
		paginated: {
			type: Boolean,
			default: false
		},
		backendPaginated: {
			type: Boolean,
			default: false
		},
		total: {
			type: [Number, String],
			default: 0
		},
		perPage: {
			type: [Number, String],
			default: 25
		},
		currentPage: {
			type: [Number, String],
			default: 1
		}
	},
	data() {
		return {
			newData: this.data,
			newColumns: [...this.columns],
			newCheckedRows: [...this.checkedRows],
			visibleDetails: [],
			currentSortColumn: {},
			isAsc: true,
			firstTimeSort: true,
			newCurrentPage: this.currentPage,
			newDataTotal: this.backendPaginated ? this.total : this.data.length
		};
	},
	computed: {
		currentClass() {
			const tag = this.$options._componentTag;
			const theme = this.currentTheme;
			return [
				tag,
				theme.base
			];
		},
		thClass() {
			const tag = `${this.$options._componentTag}-th`;
			const theme = this.currentTheme;
			return [
				tag,
				theme.th
			];
		},
		trClass() {
			const tag = `${this.$options._componentTag}-tr`;
			const theme = this.currentTheme;
			return [
				tag,
				theme.tr
			];
		},
		tdClass() {
			const tag = `${this.$options._componentTag}-td`;
			const theme = this.currentTheme;
			return [
				tag,
				theme.td
			];
		},
		isAllChecked() {
			const checkableRows = this.visibleData.filter((row) => this.isRowCheckable(row));
			if (checkableRows.length === 0) return false;
			const unchecked = checkableRows.some((current) => {
				return indexOf(this.newCheckedRows, current, this.customIsChecked) < 0;
			});
			return !unchecked;
		},
		isAllUncheckable() {
			const checkableRows = this.visibleData.filter((row) => this.isRowCheckable(row));
			return checkableRows.length === 0;
		},
		isIndeterminate() {
			return this.newCheckedRows.length > 0 && this.visibleData.length > this.newCheckedRows.length;
		},
		visibleData() {
			if (!this.paginated) return this.newData;
			const currentPage = this.newCurrentPage;
			const perPage = this.perPage;
			if (this.newData.length <= perPage) {
				return this.newData;
			} else {
				const start = (currentPage - 1) * perPage;
				const end = parseInt(start, 10) + parseInt(perPage, 10);
				return this.newData.slice(start, end);
			}
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

			if (!this.backendSorting) {
				this.sort(this.currentSortColumn, true);
			}

			if (!this.backendPaginated) {
				this.newDataTotal = value.length;
			}
		},
		columns(value) {
			this.newColumns = [...value];
		},
		checkedRows(value) {
			this.newCheckedRows = [...value];
		},
		openedDetails(expandedRows) {
			this.visibleDetails = expandedRows;
		},
		newColumns() {
			this.checkSort();
		},
		currentPage(value) {
			this.newCurrentPage = value;
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
		checkPredefinedDetailedRows() {
			const defaultExpandedRowsDefined = this.openedDetailed.length > 0;
			if (defaultExpandedRowsDefined && !this.detailKey.length) {
				console.warn('If you set a predefined opened-detailed, you must provide a unique key using the prop "detail-key"');
			}
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
			this.visibleData.forEach((current) => {
				this.removeCheckedRow(current);
				if (!allChecked) {
					if (this.isRowCheckable(current)) {
						this.newCheckedRows.push(current);
					}
				}
			});
			this.$emit('update:checkedRows', this.newCheckedRows);
		},
		sortBy(array, key, fn, isAsc) {
			let sorted = [];
			// sorting without mutating original data
			if (fn && typeof fn === 'function') {
				sorted = [...array].sort((a, b) => fn(a, b, isAsc));
			} else {
				sorted = [...array].sort((a, b) => {
					// get nested values from objects
					let newA = getValueByPath(a, key);
					let newB = getValueByPath(b, key);
					// sort boolean type
					if (typeof newA === 'boolean' && typeof newB === 'boolean') {
						return isAsc ? newA - newB : newB - newA;
					}
					if (!newA && newA !== 0) return 1;
					if (!newB && newB !== 0) return -1;
					if (newA === newB) return 0;
					newA = (typeof newA === 'string') ? newA.toUpperCase() : newA;
					newB = (typeof newB === 'string') ? newB.toUpperCase() : newB;
					return isAsc ? newA > newB ? 1 : -1 : newA > newB ? -1 : 1;
				});
			}
			return sorted;
		},
		sort(column, updatingData = false) {
			if (!column || !column.sortable) return;
			const isCurrent = column === this.currentSortColumn;
			if (!updatingData) {
				this.isAsc = isCurrent ? !this.isAsc : true;
			}
			if (!this.firstTimeSort) {
				this.$emit('sort', column.field, this.isAsc ? 'asc' : 'desc');
			}
			if (!this.backendSorting) {
				this.newData = !isCurrent
					? this.sortBy(
						this.newData,
						column.field,
						column.customSort,
						this.isAsc
					)
					: [...this.newData].reverse();
			}
			this.currentSortColumn = column;
		},
		checkSort() {
			if (this.newColumns.length && this.firstTimeSort) {
				this.initSort();
				this.firstTimeSort = false;
			} else if (this.newColumns.length) {
				if (this.currentSortColumn.field) {
					for (let i = 0; i < this.newColumns.length; i++) {
						if (this.newColumns[i].field === this.currentSortColumn.field) {
							this.currentSortColumn = this.newColumns[i];
							break;
						}
					}
				}
			}
		},
		initSort() {
			if (!this.defaultSortField) return;
			this.newColumns.forEach((column) => {
				if (column.field === this.defaultSortField) {
					this.isAsc = this.defaultSortDirection.toLowerCase() !== 'desc';
					this.sort(column, true);
				}
			});
		},
		changePage(page) {
			this.newCurrentPage = page > 0 ? page : 1;
			// emit pageChange
			this.$emit('page-change', this.newCurrentPage);
			// update current-page.sync
			this.$emit('update:currentPage', this.newCurrentPage);
		}
	},
	mounted() {
		this.checkPredefinedDetailedRows();
		this.checkSort();
	}
};
</script>
