<template>
	<tv-popper
		:tag="tag"
		:trigger="trigger"
		:placement="placement"
		:can-close="canClose"
		:disabled="disabled"
		:options="options"
		:force-show="forceShow"
		:delay-on-mouse-over="delayOnMouseOver"
		:delay-on-mouse-out="delayOnMouseOut"
		:modifiers="modifiers"
		:custom-offset="customOffset"
		:append-to-body="appendToBody"
		:transition="transition"
		:enter-class="enterClass"
		:enter-active-class="enterActiveClass"
		:enter-to-class="enterToClass"
		:leave-class="leaveClass"
		:leave-active-class="leaveActiveClass"
		:leave-to-class="leaveToClass"
		:prevent-mobile="preventMobile"
	>
		<span :class="popperClass" role="tooltip">
			{{ content }}
			<div data-popper-arrow :class="arrowClass" v-if="hasArrow" />
		</span>
		<span slot="reference" :class="referenceClass">
			<slot />
		</span>
	</tv-popper>
</template>
<script>
import TvPopper from '../popper/popper.vue';
import ThemeMixin from '../../mixins/theme.js';
import TransitionMixin from '../../mixins/transition.js';
export default {
	name: 'TvTooltip',
	mixins: [ThemeMixin, TransitionMixin],
	components: {
		'tv-popper': TvPopper
	},
	props: {
		className: {
			type: String,
			default: 'tv-tooltip'
		},
		tag: {
			type: String,
			default: 'span'
		},
		trigger: {
			type: String,
			default: 'hover',
			validator: (n) => ['click', 'hover'].indexOf(n) > -1
		},
		placement: {
			type: String,
			default: 'top',
			validator: (n) => [
				'top',
				'top-start',
				'top-end',
				'left',
				'left-start',
				'left-end',
				'right',
				'right-start',
				'right-end',
				'bottom',
				'bottom-start',
				'bottom-end'
			].indexOf(n) > -1
		},
		canClose: {
			type: [Array, Boolean],
			default: true
		},
		disabled: {
			type: Boolean,
			default: false
		},
		options: {
			type: Object,
			default: () => {}
		},
		content: {
			type: String,
			default: null
		},
		forceShow: {
			type: Boolean,
			default: false
		},
		delayOnMouseOver: {
			type: Number,
			default: 0
		},
		delayOnMouseOut: {
			type: Number,
			default: 0
		},
		hasArrow: {
			type: Boolean,
			default: true
		},
		modifiers: {
			type: Array,
			default: () => []
		},
		customOffset: {
			type: [Function, Array],
			default: () => [0, 5]
		},
		appendToBody: {
			type: Boolean,
			default: false
		},
		preventMobile: {
			type: Boolean,
			default: true
		}
	},
	computed: {
		popperClass() {
			const tag = `${this.className}-popper`;
			const theme = this.currentTheme.popper;
			return [
				tag,
				`${tag}-${this.placement}`,
				theme
			];
		},
		referenceClass() {
			const tag = `${this.className}-reference`;
			const theme = this.currentTheme.reference;
			const state = this.disabled ? 'disabled' : 'default';
			return [
				tag,
				theme.base,
				`is-${state}`,
				theme.state[state]
			];
		},
		arrowClass() {
			const tag = `${this.className}-arrow`;
			const theme = this.currentTheme.arrow;
			return [
				tag,
				theme
			];
		}
	}
};
</script>
