<template>
	<div :class="['relative', currentClass]"
		role="progressbar"
		:aria-valuenow="value"
		aria-valuemin="0"
		aria-valuemax="100"
	>
		<div :class="currentBarClass" :style="barStyle" v-if="type === 'line'">
			<span v-if="showValue" class="inline-block mx-auto px-3">
				<slot :value="value">
					{{ newValue }}
				</slot>
			</span>
		</div>
		<div v-else :style="{height: width + 'px', width: width + 'px'}">
			<svg viewBox="0 0 100 100">
				<path
					:class="currentSvgPathClass"
					:d="trackPath"
					:stroke-width="relativeStrokeWidth"
					fill="none"
					:style="trailPathStyle"
				/>
				<path
					:class="currentBarClass"
					:d="trackPath"
					fill="none"
					stroke-linecap="round"
					:stroke-width="value ? relativeStrokeWidth : 0"
					:style="circlePathStyle"
				/>
			</svg>
		</div>
		<div v-if="showValue && type !== 'line'" :class="currentSvgTextClass">
			<slot :value="value">
				{{ newValue }}
			</slot>
		</div>
	</div>
</template>
<script>
import ThemeMixin from '../../mixins/theme.js';
export default {
	name: 'TvProgressBar',
	mixins: [ThemeMixin],
	props: {
		className: {
			type: String,
			default: 'tv-progress-bar'
		},
		type: {
			type: String,
			default: 'line',
			validator: (value) => ['line', 'circle'].indexOf(value) >= 0
		},
		variant: {
			type: String,
			default: 'default',
			validator: (value) => ['default', 'primary', 'info', 'success', 'danger', 'warning'].indexOf(value) >= -1
		},
		size: {
			type: String,
			default: 'default',
			validator: (value) => ['default', 'sm', 'lg'].indexOf(value) >= 0
		},
		value: {
			type: Number,
			default: 0,
			required: true,
			validator: (value) => value >= 0 && value <= 100
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
		customBarVariantClass: {
			type: [Function, String],
			default: undefined
		},
		customTextVariantClass: {
			type: [Function, String],
			default: undefined
		},
		width: {
			type: Number,
			default: 125
		},
		strokeWidth: {
			type: Number,
			default: 6
		}
	},
	computed: {
		newValue() {
			if (this.format === 'percent') {
				const val = this.toFixed(this.value * 100 / 100);
				return `${val}%`;
			}
			const val = this.toFixed(this.value);
			return val;
		},
		barStyle() {
			const width = this.value;
			const styles = {
				width: `${width}%`,
				transition: 'all 0.6s ease-in-out'
			};
			return styles;
		},
		currentClass() {
			const type = this.type === 'line' ? 'line' : 'svg';
			const tag = `${this.className}-${type}`;
			const theme = this.currentTheme[type];
			// add tags first
			const classes = [
				tag
			];
			if (type === 'line') {
				classes.push(`${tag}-size-${this.size}`);
				classes.push(theme.size[this.size]);
			}
			// base theme classes
			classes.push(theme.base);
			// size theme classes
			return classes;
		},
		currentBarClass() {
			const type = this.type === 'line' ? 'line' : 'svg';
			const tag = `${this.className}-${type}-bar`;
			const theme = this.currentTheme[type];
			const value = this.value;
			// add tags first
			const classes = [
				tag,
				`is-${this.variant}`
			];
			// base theme classes
			classes.push(theme.bar.base);

			if (typeof this.customBarVariantClass === 'function') {
				classes.push(this.customBarVariantClass.apply(null, [value]));
			} else if (typeof this.customBarVariantClass === 'string') {
				classes.push(this.customBarVariantClass);
			} else {
				// theme variant classes
				classes.push(`${theme.bar.variant[this.variant]}`);
			}

			return classes;
		},
		currentSvgTextClass() {
			const tag = `${this.className}-svg-text`;
			const theme = this.currentTheme.svg;
			const value = this.value;
			const classes = [
				tag,
				`is-${this.variant}`,
				theme.text.base
			];
			if (typeof this.customTextVariantClass === 'function') {
				classes.push(this.customTextVariantClass.apply(null, [value]));
			} else if (typeof this.customTextVariantClass === 'string') {
				classes.push(this.customTextVariantClass);
			} else {
				classes.push(`${theme.text.variant[this.variant]}`);
			}
			return classes;
		},
		currentSvgPathClass() {
			const tag = `${this.className}-svg-path`;
			const theme = this.currentTheme.svg.path;
			return [
				tag,
				theme
			];
		},
		relativeStrokeWidth() {
			return (this.strokeWidth / this.width * 100).toFixed(1);
		},
		radius() {
			if (this.type === 'circle' || this.type === 'dashboard') {
				return parseInt(50 - parseFloat(this.relativeStrokeWidth) / 2, 10);
			} else {
				return 0;
			}
		},
		trackPath() {
			const radius = this.radius;
			const isDashboard = this.type === 'dashboard';
			return `
          M 50 50
          m 0 ${isDashboard ? '' : '-'}${radius}
          a ${radius} ${radius} 0 1 1 0 ${isDashboard ? '-' : ''}${radius * 2}
          a ${radius} ${radius} 0 1 1 0 ${isDashboard ? '' : '-'}${radius * 2}
          `;
		},
		perimeter() {
			return 2 * Math.PI * this.radius;
		},
		rate() {
			return this.type === 'dashboard' ? 0.75 : 1;
		},
		strokeDashoffset() {
			const offset = -1 * this.perimeter * (1 - this.rate) / 2;
			return `${offset}px`;
		},
		trailPathStyle() {
			return {
				strokeDasharray: `${(this.perimeter * this.rate)}px, ${this.perimeter}px`,
				strokeDashoffset: this.strokeDashoffset
			};
		},
		circlePathStyle() {
			return {
				strokeDasharray: `${this.perimeter * this.rate * (this.value / 100)}px, ${this.perimeter}px`,
				strokeDashoffset: this.strokeDashoffset,
				transition: 'stroke-dasharray 0.6s ease 0s, stroke 0.6s ease'
			};
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
