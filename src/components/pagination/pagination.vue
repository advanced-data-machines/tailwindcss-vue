<template>
	<div :class="currentClass">
		<span :class="textClass">
			<template v-if="total === 0">
				<slot name="pagation-no-result">
					No Results
				</slot>
			</template>
			<template v-if="perPage == 1">
				{{ firstItem }} / {{ total }}
			</template>
			<template v-else>
				{{ firstItem }}-{{ Math.min(current * perPage, total) }} / {{ total }}
			</template>
		</span>
		<nav :class="buttonGroupClass">
			<tv-pagination-button
				:disabled="current === 1"
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
				:disabled="current === pageCount || pageCount === 0"
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
import ThemeMixin from '@/mixins/theme.js';
import TvPaginationButton from './pagination-button.vue';
export default {
	name: 'TvPagination',
	mixins: [ ThemeMixin ],
	components: {
		'tv-pagination-button': TvPaginationButton
	},
	props: {
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
			const tag = this.$options._componentTag;
			const theme = this.currentTheme;
			return [
				tag,
				theme.base
			];
		},
		textClass() {
			const tag = `${this.$options._componentTag}-text`;
			const theme = this.currentTheme;
			return [
				tag,
				theme.text
			];
		},
		buttonGroupClass() {
			const tag = `${this.$options._componentTag}-button-group`;
			const theme = this.currentTheme;
			return [
				tag,
				theme.buttonGroup
			];
		},
		firstItem() {
			const firstItem = this.current * this.perPage - this.perPage + 1;
			return firstItem >= 0 ? firstItem : 0;
		},
		pageCount() {
			return Math.ceil(this.total / this.perPage);
		},
		hasPrevious() {
			return this.current > 1;
		},
		hasNext() {
			return this.current < this.pageCount;
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
