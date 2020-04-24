<template>
	<tv-popper
		ref="popper"
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
		:class="wrapperClass"
	>
		<div :class="popperClass" :role="menuAriaRole">
			<slot />
			<div data-popper-arrow :class="arrowClass" v-if="hasArrow" />
		</div>
		<div slot="reference" :class="referenceClass" role="button" aria-haspopup="true">
			<slot name="trigger" :disabled="disabled" />
		</div>
	</tv-popper>
</template>
<script>
import TvPopper from '../popper/popper.vue';
import ThemeMixin from '../../mixins/theme.js';
import TransitionMixin from '../../mixins/transition.js';
export default {
	name: 'TvDropdown',
	mixins: [ThemeMixin, TransitionMixin],
	components: {
		'tv-popper': TvPopper
	},
	props: {
		className: {
			type: String,
			default: 'tv-dropdown'
		},
		value: {
			type: [Object, String, Boolean, Array, Number, Function],
			default: null
		},
		multiple: {
			type: Boolean,
			default: false
		},
		tag: {
			type: String,
			default: 'span'
		},
		trigger: {
			type: String,
			default: 'click',
			validator: (n) => ['click', 'hover'].indexOf(n) > -1
		},
		placement: {
			type: String,
			default: 'bottom-start',
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
		closeOnClick: {
			type: Boolean,
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
			default: 300
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
			default: () => [0, 10]
		},
		appendToBody: {
			type: Boolean,
			default: false
		},
		preventMobile: {
			type: Boolean,
			default: false
		},
		ariaRole: {
			type: String,
			default: null
		}
	},
	data() {
		return {
			selected: this.value
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
		popperClass() {
			const tag = `${this.className}-popper`;
			const theme = this.currentTheme.popper;
			return [
				tag,
				`is-${this.placement}`,
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
		},
		menuAriaRole() {
			return (this.ariaRole === 'menu' || this.ariaRole === 'list') ? this.ariaRole : null;
		}
	},
	methods: {
		selectItem(value) {
			if (this.multiple) {
				if (this.selected && Array.isArray(this.selected)) {
					const index = this.selected.indexOf(value);
					if (index === -1) {
						this.selected.push(value);
					} else {
						this.selected.splice(index, 1);
					}
				} else {
					this.selected = [value];
				}
				this.$emit('change', this.selected);
			} else {
				if (this.selected !== value) {
					this.selected = value;
					this.$emit('change', this.selected);
				}
			}
			this.$emit('input', this.selected);
			if (!this.multiple) {
				if (this.closeOnClick) {
					this.$refs.popper.handleClose();
				}
			}
		}
	},
	watch: {
		value(value) {
			this.selected = value;
		}
	}
};
</script>
