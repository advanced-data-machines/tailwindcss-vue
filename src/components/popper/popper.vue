<template>
	<component :is="tag">
		<transition
			:name="transition"
			:enter-active-class="enterActiveClass"
			:leave-active-class="leaveActiveClass"
			@afer-leave="handleDestroy"
		>
			<span v-show="!isDisabled && showPopper" :aria-hidden="!showPopper">
				<slot>{{ content }}</slot>
			</span>
		</transition>
		<slot name="reference" />
	</component>
</template>
<script>
import { createPopper } from '@popperjs/core';
import { objectAssign } from '../../utils/utils.js';
function on(element, event, handler) {
	if (element && event && handler) {
		document.addEventListener ? element.addEventListener(event, handler, false) : element.attachEvent('on' + event, handler);
	}
}
function off(element, event, handler) {
	if (element && event && handler) {
		document.removeEventListener ? element.removeEventListener(event, handler, false) : element.detachEvent('on' + event, handler);
	}
}
export default {
	name: 'TvPopper',
	props: {
		tag: {
			type: String,
			default: 'span'
		},
		trigger: {
			type: String,
			default: 'click'
		},
		canClose: {
			type: [Array, Boolean],
			default: true
		},
		disabled: {
			type: Boolean,
			default: false
		},
		reference: {
			type: Object,
			default: () => {}
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
			default: false
		},
		arrowClass: {
			type: String,
			default: 'bg-gray-100'
		},
		placement: {
			type: String,
			default: 'bottom',
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
		customOffset: {
			type: [Function, Array],
			default: () => [0, 5]
		},
		appendToBody: {
			type: Boolean,
			default: false
		},
		transition: {
			type: String,
			default: null
		},
		enterActiveClass: {
			type: String,
			default: 'animated fadeIn faster'
		},
		leaveActiveClass: {
			type: String,
			default: 'animated fadeOut faster'
		},
		preventMobile: {
			type: Boolean,
			default: true
		}
	},
	computed: {
		closeOptions() {
			return typeof this.canClose === 'boolean'
				? this.canClose
					? ['escape', 'outside']
					: []
				: this.canClose;
		},
		isDisabled() {
			return this.disabled || (this.preventMobile && typeof window !== 'undefined' && /(iphone|ipod|ipad|android|iemobile|blackberry|bada)/.test(window.navigator.userAgent.toLowerCase()));
		}
	},
	data() {
		return {
			popperJs: null,
			referenceElm: null,
			popper: null,
			showPopper: false,
			timerOver: null,
			timerOut: null
		};
	},
	watch: {
		showPopper(value) {
			if (value) {
				this.$emit('show');
				this.updatePopper();
			} else {
				this.$emit('hide');
			}
		},
		forceShow: {
			handler(value) {
				this[value ? 'handleShow' : 'handleClose']();
			},
			immediate: true
		},
		disabled(value) {
			if (!value) {
				this.showPopper = false;
			}
		}
	},
	methods: {
		async updatePopper() {
			!this.popperJs ? this.createPopper() : this.popperJs.update();
		},
		createPopper() {
			this.$nextTick(() => {
				if (this.isDisabled) return;
				if (this.hasArrow && !this.appendedArrow) {
					this.appendArrow(this.popper);
				}

				if (this.appendToBody && !this.appendedToBody) {
					this.appendedToBody = true;
					document.body.appendChild(this.popper.parentElement);
				}

				if (this.popperJs && this.popperJs.destroy) {
					this.popperJs.destroy();
				}
				const options = objectAssign({}, this.options, { placement: this.placement,
					modifiers: [
						{
							name: 'offset',
							options: {
								offset: ({ placement, reference, popper }) => this.handleOffset(placement, reference, popper)
							}
						}
					]
				});
				this.popperJs = createPopper(this.referenceElm, this.popper, options);
			});
		},
		handleOffset(placement, reference, popper) {
			if (typeof this.customOffset === 'function') {
				return this.customOffset.apply(null, [placement, reference, popper]);
			}
			return this.customOffset;
		},
		appendArrow(element) {
			if (this.appendedArrow) return;
			this.appendedArrow = true;
			const arrow = document.createElement('div');
			arrow.setAttribute('data-popper-arrow', '');
			arrow.className = `tv-popper-arrow ${this.arrowClass}`;
			element.appendChild(arrow);
		},
		toggle() {
			if (this.isDisabled) return;
			this.showPopper = !this.showPopper;
		},
		handleShow() {
			this.showPopper = true;
		},
		handleClose() {
			this.showPopper = false;
		},
		onMouseOver() {
			if (this.isDisabled || this.isTouch) return;
			clearTimeout(this.timerOver);
			clearTimeout(this.timerOut);
			this.timerOver = setTimeout(() => {
				this.showPopper = true;
			}, this.delayOnMouseOver);
		},
		onMouseOut() {
			if (this.isDisabled) return;
			clearTimeout(this.timerOut);
			clearTimeout(this.timerOver);
			this.timerOut = setTimeout(() => {
				this.showPopper = false;
			}, this.delayOnMouseOut);
		},
		handleDestroy() {
			if (this.popperJs) {
				this.popperJs.destroy();
				this.popperJs = null;
			}
			if (this.appendedToBody) {
				this.appendedToBody = false;
				document.body.removeChild(this.popper.parentElement);
			}
		},
		destroyPopper() {
			off(this.referenceElm, 'click', this.toggle);
			off(document, 'click', this.clickOutside);
			off(this.$el, 'mounseover', this.onMouseOver);
			off(this.$el, 'mouseout', this.onMouseOut);
			off(document, 'keyup', this.keyPress);
			this.showPopper = false;
			this.handleDestroy();
		},
		clickOutside(e) {
			if (
				this.closeOptions.indexOf('outside') === -1 ||
				this.forceShow ||
				!this.$el ||
				!this.referenceElm ||
				this.elementContains(this.$el, e.target) ||
				this.elementContains(this.referenceElm, e.target) ||
				!this.popper ||
				this.elementContains(this.popper, e.target)
			) return;

			this.$emit('documentClick', this);
			this.showPopper = false;
		},
		elementContains(elm, otherElm) {
			if (typeof elm.contains === 'function') {
				return elm.contains(otherElm);
			}
			return false;
		},
		keyPress(event) {
			if (this.isActive && event.keyCode === 27 && this.cancelOptions.indexOf('escape') > -1) this.isActive = false;
		}
	},
	created() {
		this.appendedArrow = false;
		this.appendedToBody = false;
	},
	mounted() {
		this.referenceElm = this.reference || this.$slots.reference[0].elm;
		this.popper = this.$slots.default[0].elm;

		switch (this.trigger) {
		case 'hover':
			on(this.$el, 'mouseover', this.onMouseOver);
			on(this.$el, 'mouseout', this.onMouseOut);
			break;
		case 'click':
			on(this.referenceElm, 'click', this.toggle);
			on(document, 'click', this.clickOutside);
			break;
		}
		on(document, 'keyup', this.keyPress);
	},
	destroyed() {
		this.destroyPopper();
	}
};
</script>
