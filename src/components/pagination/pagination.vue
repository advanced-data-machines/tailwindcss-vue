<template>
	<div :class="currentClass">
		<span :class="textClass">
			<template v-if="total === 0 || filteredTotal === 0 && searching">
				<slot name="pagation-no-result">
					No Results
				</slot>
			</template>
			<template v-else-if="perPage == 1">
				{{ firstItem }} / {{ total }}
			</template>
			<template v-else>
				{{ firstItem }}-{{ Math.min(current * perPage, this.newTotal) }} / {{ total }} - page {{ current }} / {{ pageCount }}
			</template>
		</span>
		<nav :class="buttonGroupClass">
			<tv-pagination-button
				:disabled="!hasFirst"
				:size="buttonSize"
				:variant="buttonVariant"
				:outline="buttonOutline"
				:square="buttonSquare"
				:rounded="buttonRounded"
				@click="changePage(1)"
				aria-label="first"
			>
				<slot name="first">
					First
				</slot>
			</tv-pagination-button>
			<tv-pagination-button
				:disabled="!hasPrevious"
				:size="buttonSize"
				:variant="buttonVariant"
				:outline="buttonOutline"
				:square="buttonSquare"
				:rounded="buttonRounded"
				@click="changePage(current - 1)"
				aria-label="previous"
			>
				<slot name="previous">
					Previous
				</slot>
			</tv-pagination-button>
			<tv-pagination-button
				:disabled="!hasNext"
				:size="buttonSize"
				:variant="buttonVariant"
				:outline="buttonOutline"
				:square="buttonSquare"
				:rounded="buttonRounded"
				@click="changePage(current + 1)"
				aria-label="next"
			>
				<slot name="next">
					Next
				</slot>
			</tv-pagination-button>
			<tv-pagination-button
				:disabled="!hasLast"
				:size="buttonSize"
				:variant="buttonVariant"
				:outline="buttonOutline"
				:square="buttonSquare"
				:rounded="buttonRounded"
				@click="changePage(pageCount)"
				aria-label="last"
			>
				<slot name="last">
					Last
				</slot>
			</tv-pagination-button>
		</nav>
	</div>
</template>
<script>
import ThemeMixin from '../../mixins/theme.js';
import TvPaginationButton from './pagination-button.vue';
export default {
	name: 'TvPagination',
	mixins: [ThemeMixin],
	components: {
		'tv-pagination-button': TvPaginationButton
	},
	props: {
		className: {
			type: String,
			default: 'tv-pagination'
		},
		total: {
			type: [Number, String],
			default: 0
		},
		perPage: {
			type: [Number, String],
			default: 25
		},
		current: {
			type: [Number, String],
			default: 1
		},
		disabled: {
			type: Boolean,
			default: false
		},
		filteredTotal: {
			type: [Number, String],
			default: 0
		},
		searching: {
			type: Boolean,
			default: false
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
		}
	},
	computed: {
		currentClass() {
			const tag = this.className;
			const theme = this.currentTheme.base;
			return [
				tag,
				theme
			];
		},
		textClass() {
			const tag = `${this.className}-text`;
			const theme = this.currentTheme.text;
			return [
				tag,
				theme
			];
		},
		buttonGroupClass() {
			const tag = `${this.className}-button-group`;
			const theme = this.currentTheme.buttonGroup;
			return [
				tag,
				theme
			];
		},
		firstItem() {
			if (this.total === 0) return 0;
			const firstItem = this.current * this.perPage - this.perPage + 1;
			return firstItem >= 0 ? firstItem : 0;
		},
		pageCount() {
			return Math.ceil(this.newTotal / this.perPage);
		},
		hasFirst() {
			return !this.disabled && this.current > 1;
		},
		hasPrevious() {
			return !this.disabled && this.current > 1;
		},
		hasNext() {
			return !this.disabled && this.current < this.pageCount;
		},
		hasLast() {
			return !this.disabled && (this.current < this.pageCount && this.pageCount !== 0);
		},
		newTotal() {
			return this.searching ? this.filteredTotal : this.total;
		}
	},
	watch: {
		pageCount(value) {
			if (this.current > value) this.last();
		}
	},
	methods: {
		previous() {
			this.changePage(this.current - 1, event);
		},
		next(event) {
			this.changePage(this.current + 1, event);
		},
		first(event) {
			this.changePage(1, event);
		},
		last(event) {
			this.changePage(this.pageCount, event);
		},
		changePage(number) {
			if (this.current === number || number < 1 || number > this.pageCount) return;
			this.$emit('update:current', number);
			this.$emit('change', number);
		}
	}
};
</script>
