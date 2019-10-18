<template>
	<nav>
		<tv-pagination-button :disabled="!hasPrevious" :size="" :variant="">Previous</tv-pagination-button>
	</nav>
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
			default: null
		},
		buttonRounded: {
			type: Boolean,
			default: false
		}
	},
	computed: {
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
			this.$emit('change', number);
			this.$emit('update:current', number);
		}
	}
};
</script>
