<template>
	<div>
		<tv-pagination
			v-if="paginated && !externalPaginated && handlePaginationLocation('top')"
			:total="newDataTotal"
			:current.sync="newCurrentPage"
			:searching="search !== ''"
			:filtered-total="searchResults.length"
			:per-page="perPage"
			:button-size="buttonSize"
			:button-variant="buttonVariant"
			:button-outline="buttonOutline"
			:button-square="buttonSquare"
			:button-rounded="buttonRounded"
			@change="changePage"
		>
			<template slot="first">
				<slot name="first" />
			</template>
			<template slot="previous">
				<slot name="previous" />
			</template>
			<template slot="next">
				<slot name="next" />
			</template>
			<template slot="last">
				<slot name="last" />
			</template>
		</tv-pagination>
		<component ref="wrapper" :is="componentToRender" v-bind="getAttributes()" v-on="getListeners()" :class="wrapperClass">
			<div ref="scroller" :class="{ 'overflow-auto': resizable || responsive, 'h-full relative': resizable }">
				<table :class="tableClass">
					<thead>
						<tr>
							<th v-if="detailed" :class="[thClass, 'w-1']"><span :class="detailToggleHrClass" /></th>
							<th v-if="showCheckbox && checkboxPosition == 'left'" :class="[thClass, 'w-1']">
								<tv-checkbox v-if="showHeaderCheckbox" :value="isAllChecked" :disabled="isAllUncheckable" @change.native="checkAll" :indeterminate="isIndeterminate" />
							</th>
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
							<th v-if="showCheckbox && checkboxPosition == 'right'" :class="[thClass, 'w-1']">
								<tv-checkbox v-if="showHeaderCheckbox" :value="isAllChecked" :disabled="isAllUncheckable" @change.native="checkAll" :indeterminate="isIndeterminate" />
							</th>
						</tr>
					</thead>
					<tbody v-if="visibleData.length > 0" data-tbody="results">
						<template v-for="(row, index) in visibleData">
							<tr :class="[trClass, handleCustomRowClass(row, index)]" :key="customRowKey ? row[customRowKey] : index">
								<td v-if="detailed" :class="tdClass" data-label="Detail">
									<slot name="arrow" :opened="isDetailActive">
										<tv-table-arrow @click="toggleDetail(row)" :opened="isDetailActive(row)" />
									</slot>
								</td>
								<td v-if="showCheckbox && checkboxPosition == 'left'" :class="tdClass" data-label="Select">
									<tv-checkbox :disabled="!isRowCheckable(row)" :value="isRowChecked(row)" @change.native="checkRow(row)" @click.native.stop />
								</td>
								<slot v-if="$scopedSlots['default']" :row="row" :index="index" :td-class="tdClass" />
								<template v-else>
									<td v-for="column in newColumns" :key="column.field" :class="tdClass" :data-label="column.label">
										<span v-if="column.renderHtml" v-html="getValueByPath(row, column.field)" />
										<template v-else>
											{{ getValueByPath(row, column.field) }}
										</template>
									</td>
								</template>
								<td v-if="showCheckbox && checkboxPosition == 'right'" :class="tdClass" data-label="Select">
									<tv-checkbox :disabled="!isRowCheckable(row)" :value="isRowChecked(row)" @change.native="checkRow(row)" @click.native.stop />
								</td>
							</tr>
							<tr :key="(customRowKey ? row[customRowKey] : index) + '-detail'" v-if="isDetailActive(row)">
								<td colspan="100" class="p-0">
									<slot name="detail" :row="row" :index="index" />
								</td>
							</tr>
						</template>
					</tbody>
					<tbody v-else data-tbody="no-data">
						<tr :class="trClass">
							<slot name="no-data" :data="visibleData" :td-class="tdClass" :loading="loading">
								<td :class="tdClass" colspan="100">
									<span v-if="loading">Loading...</span>
									<span v-else>No Matching Results</span>
								</td>
							</slot>
						</tr>
					</tbody>
				</table>
			</div>
			<template slot="resizable-b">
				<slot name="resizable-b" />
			</template>
		</component>
		<tv-pagination
			v-if="paginated && !externalPaginated && handlePaginationLocation('bottom')"
			:total="newDataTotal"
			:current.sync="newCurrentPage"
			:searching="search !== ''"
			:filtered-total="searchResults.length"
			:per-page="perPage"
			:button-size="buttonSize"
			:button-variant="buttonVariant"
			:button-outline="buttonOutline"
			:button-square="buttonSquare"
			:button-rounded="buttonRounded"
			@change="changePage"
		>
			<template slot="first">
				<slot name="first" />
			</template>
			<template slot="previous">
				<slot name="previous" />
			</template>
			<template slot="next">
				<slot name="next" />
			</template>
			<template slot="last">
				<slot name="last" />
			</template>
		</tv-pagination>
	</div>
</template>
<script>
import { getValueByPath, indexOf, hasOwn, isEmpty } from '../../utils/utils.js';
import ThemeMixin from '../../mixins/theme.js';
import TvCheckbox from '../checkbox/checkbox.vue';
import TvPagination from '../pagination/pagination.vue';
import TvTableArrow from './table-arrow.vue';
import TvResizable from '../resizable/resizable.vue';
export default {
	name: 'TvTable',
	components: {
		'tv-checkbox': TvCheckbox,
		'tv-pagination': TvPagination,
		'tv-table-arrow': TvTableArrow,
		'tv-resizable': TvResizable
	},
	provide() {
		return {
			tableColumns: this.newColumns
		};
	},
	mixins: [ThemeMixin],
	props: {
		className: {
			type: String,
			default: 'tv-table'
		},
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
		checkboxPosition: {
			type: String,
			default: 'right'
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
		externalPaginated: {
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
		},
		buttonVariant: {
			type: String,
			default: 'default',
			validator: (value) => ['default', 'primary', 'info', 'success', 'danger', 'warning'].indexOf(value) > -1
		},
		buttonSize: {
			type: String,
			default: 'default',
			validator: (value) => ['default', 'sm', 'lg'].indexOf(value) > -1
		},
		buttonOutline: {
			type: Boolean,
			default: false
		},
		buttonSquare: {
			type: Boolean,
			default: false
		},
		buttonRounded: {
			type: Boolean,
			default: false
		},
		search: {
			type: String,
			default: ''
		},
		customSearch: {
			type: Function,
			default: undefined
		},
		paginationLocation: {
			type: String,
			default: 'bottom',
			validate: (x) => ['top', 'bottom', 'both'].indexOf(x) > -1
		},
		resizable: {
			type: Boolean,
			default: false
		},
		resizableProps: {
			type: Object,
			default: () => {}
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
		wrapperClass() {
			const tag = `${this.className}-wrapper`;
			const theme = this.currentTheme.wrapper;
			return [
				tag,
				theme
			];
		},
		tableClass() {
			const tag = this.className;
			const theme = this.currentTheme.table;
			return [
				tag,
				theme
			];
		},
		thClass() {
			const tag = `${this.className}-th`;
			const theme = this.currentTheme.th;
			return [
				tag,
				theme
			];
		},
		trClass() {
			const tag = `${this.className}-tr`;
			const theme = this.currentTheme.tr;
			return [
				tag,
				theme
			];
		},
		tdClass() {
			const tag = `${this.className}-td`;
			const theme = this.currentTheme.td;
			return [
				tag,
				theme
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
			if (this.visibleData.length === 0 || this.newCheckedRows.length === 0) return false;
			let visibleChecked = 0;
			const checked = this.newCheckedRows.map((r) => JSON.stringify(r));
			for (let i = 0; i < this.visibleData.length; i++) {
				const inx = checked.indexOf(JSON.stringify(this.visibleData[i]));
				if (inx > -1) visibleChecked++;
			}
			return visibleChecked > 0 && this.visibleData.length > visibleChecked;
		},
		searchResults() {
			const data = this.newData;
			if (this.search === '') {
				return data;
			}
			if (typeof this.customSearch === 'function') {
				return this.customSearch.apply(null, data);
			}
			const srch = this.search.toLowerCase();
			return data.filter((p) => {
				for (const prop in p) {
					if (hasOwn(p, prop)) {
						let compare = p[prop];
						if (typeof compare === 'number') compare = compare.toString();

						if (typeof compare === 'string') {
							if (compare.toLowerCase().indexOf(srch) !== -1) return true;
						}
					}
				}
				return false;
			});
		},
		visibleData() {
			const results = this.searchResults;
			if (!this.paginated) return results;
			const currentPage = this.newCurrentPage;
			const perPage = this.perPage;
			if (results.length <= perPage) {
				return results;
			} else {
				const start = (currentPage - 1) * perPage;
				const end = parseInt(start, 10) + parseInt(perPage, 10);
				return results.slice(start, end);
			}
		},
		componentToRender() {
			if (this.resizable) {
				return this.$options.components.TvResizable;
			}
			return 'div';
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
				if (!this.newColumns.length) {
					this.newColumns = newColumns;
				};
			});
			setTimeout(() => {
				if (this.resizable && !isEmpty(this.$refs.scroller)) this.$emit('scroll-height', this.$refs.scroller.scrollHeight);
			}, 0);

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
		},
		perPage() {
			this.changePage(1);
		},
		total(value) {
			if (this.backendPaginated) {
				this.newDataTotal = value;
			}
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
			const defaultExpandedRowsDefined = this.openedDetails.length > 0;
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
			if (!updatingData) {
				this.isAsc = column === this.currentSortColumn ? !this.isAsc : true;
			}
			if (!this.firstTimeSort) {
				this.$emit('sort', column.field, this.isAsc ? 'asc' : 'desc');
			}
			if (!this.backendSorting) {
				this.newData = this.sortBy(
					this.newData,
					column.field,
					column.customSort,
					this.isAsc
				);
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
			// update current-page.sync
			this.$emit('update:currentPage', this.newCurrentPage);
			// emit pageChange
			this.$emit('page-change', this.newCurrentPage);
		},
		handlePaginationLocation(location) {
			return (this.paginationLocation === 'both' || location === this.paginationLocation);
		},
		getAttributes() {
			if (this.resizable) {
				return {
					...this.resizableProps
				};
			}
			return {};
		},
		getListeners() {
			if (this.resizable) {
				return {
					'resize-start': (e) => this.$emit('resize-start', e),
					'resize-move': (e) => this.$emit('resize-move', e),
					'resize-end': (e) => this.$emit('resize-end', e),
					mount: (e) => this.$emit('resize-mount', e)
				};
			}
			return {};
		}
	},
	mounted() {
		this.checkPredefinedDetailedRows();
		this.checkSort();
	}
};
</script>
