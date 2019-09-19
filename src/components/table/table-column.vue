<template>
	<td :class="currentClass">
		<slot />
	</td>
</template>
<script>
import ThemeMixin from '../../mixins/theme.js';
export default {
	name: 'TvTableColumn',
	inject: {
		tableColumns: {
			default: undefined
		}
	},
	mixins: [ThemeMixin],
	props: {
		label: {
			type: String,
			default: null
		},
		field: {
			type: String,
			default: null
		},
		customKey: {
			type: [String, Number],
			default: undefined
		},
		width: {
			type: String,
			default: undefined
		},
		sortable: {
			type: Boolean,
			default: false
		},
		customHeaderClass: {
			type: [Function, String],
			default: null
		},
		internal: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			key: this.customKey || this.label
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
	methods: {
		addToTable() {
			if (!this.tableColumns) {
				this.$destroy();
				throw new Error('(TV Error[TvTableColumn]) - TvTableColumn should be wrapped in TvTable');
			}
			if (this.internal) return;
			// check to make sure columns are not duplicated
			const repeat = this.tableColumns.some(column => column.key === this.key);
			!repeat && this.tableColumns.push(this);
		}
	},
	mounted() {
		this.addToTable();
	},
	beforeUpdate() {
		this.addToTable();
	},
	beforeDestroy() {
		const index = this.$parent.newColumns.map(
			(column) => column.newKey).indexOf(this.newKey);
		if (index >= 0) {
			this.$parent.newColumns.splice(index, 1);
		}
	}
};
</script>
