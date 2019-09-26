<template>
	<div :class="currentClass">
		<div :class="currentBarClass" :style="barStyle">
			<div v-if="showValue">
				<span v-if="!$scopedSlots.default">{{ newValue }}</span>
				<slot v-else :value="newValue" />
			</div>
			<span v-else>&nbsp;</span>
		</div>
	</div>
</template>
<script>
import ThemeMixin from '../../mixins/theme.js';
export default {
	name: 'TvProgress',
	mixins: [ThemeMixin],
	props: {
		variant: {
			type: String,
			default: 'default',
			validator: (value) => ['default', 'primary', 'info', 'success', 'danger', 'warning'].indexOf(value) !== -1
		},
		size: {
			type: String,
			default: 'default',
			validator: (value) => ['default', 'sm', 'lg'].indexOf(value) >= 0
		},
		value: {
			type: Number,
			default: undefined
		},
		showValue: {
			type: Boolean,
			default: true
		},
		format: {
			type: String,
			default: 'percent',
			validator: (value) => ['raw', 'percent'].indexOf(value) >= 0
		},
		precision: {
			type: Number,
			default: 2
		},
		keepTrailingZeroes: {
			type: Boolean,
			default: false
		},
		customVariantClass: {
			type: [Function, String],
			default: undefined
		}
	},
	computed: {
		newValue() {
			if (this.value === undefined || this.value === null || isNaN(this.value)) {
				return undefined;
			}
			if (this.format === 'percent') {
				const val = this.toFixed(this.value * 100 / 100);
				return `${val}%`;
			}
			const val = this.toFixed(this.value);
			return val;
		},
		barStyle() {
			let width = this.value;
			if (width === undefined || width === null || isNaN(width)) {
				width = 0;
			}
			let styles = {
				width: `${width}%`,
				transition: 'all 0.3s ease-in-out'
			};
			return styles;
		},
		currentClass() {
			const tag = this.$options._componentTag;
			const theme = this.currentTheme;
			// add tags first
			let classes = [
				tag,
				`${tag}-size-${this.size}`
			];
			// base theme classes
			classes.push(theme.base);
			// size theme classes
			return classes;
		},
		currentBarClass() {
			const tag = `${this.$options._componentTag}-bar`;
			const theme = this.currentTheme;
			const value = this.value;
			// add tags first
			let classes = [
				tag,
				`${tag}-${this.variant}`
			];
			// base theme classes
			classes.push(theme['bar'].base);

			classes.push(theme.size[this.size]);

			if (typeof this.customVariantClass === 'function') {
				classes.push(this.customVariantClass.apply(null, [value]));
			} else if (typeof this.customVariantClass === 'string') {
				classes.push(this.customVariantClass);
			} else {
				// theme variant classes
				classes.push(`${theme.bar.variant[this.variant]}`);
			}

			return classes;
		}
	},
	methods: {
		toFixed(num) {
			let fixed = (+(`${Math.round(+(`${num}e${this.precision}`))}e${-this.precision}`)).toFixed(this.precision);
			if (!this.keepTrailingZeroes) {
				fixed = fixed.replace(/\.?0+$/, '');
			}
			return fixed;
		}
	}
};
</script>
