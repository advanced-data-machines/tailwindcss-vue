<template>
	<tv-popper
		:tag="tag"
		:trigger="null"
		:placement="placement"
		:disabled="disabled"
		:options="options"
		:force-show="isActive && (data.length > 0 || hasEmptySlot)"
		:delay-on-mouse-over="delayOnMouseOver"
		:delay-on-mouse-out="delayOnMouseOut"
		:modifiers="newModifiers"
		:custom-offset="customOffset"
		:append-to-body="appendToBody"
		:transition="transition"
		:enter-class="enterClass"
		:enter-active-class="enterActiveClass"
		:enter-to-class="enterToClass"
		:leave-class="leaveClass"
		:leave-active-class="leaveActiveClass"
		:leave-to-class="leaveToClass"
		:class="wrapperClass"
	>
		<div ref="popper" :class="popperClass">
			<div class="overflow-y-auto" ref="popper-content" :style="contentStyle">
				<tv-autocomplete-item
					v-for="(option, index) in data"
					:key="index"
					@click="setSelected(option)"
					:active="hovered == option"
				>
					<slot
						v-if="$scopedSlots['default']"
						:option="option"
						:index="index"
					/>
					<template v-else>
						{{ getValue(option, true) }}
					</template>
				</tv-autocomplete-item>
				<div v-if="data.length === 0 && hasEmptySlot">
					<slot name="empty" />
				</div>
			</div>
			<div data-popper-arrow :class="arrowClass" v-if="hasArrow" />
		</div>
		<span ref="reference" slot="reference" :class="referenceClass">
			<tv-input
				ref="input"
				v-bind="$attrs"
				v-model="newValue"
				type="text"
				:disabled="disabled"
				:readonly="readonly"
				:size="size"
				:validate-event="validateEvent"
				:autocomplete="this.autocompleate"
				@input="onInput"
				@focus="onFocus"
				@blur="onBlur"
				@keyup.native.esc.prevent="isActive = false"
				@keydown.native.tab="tabPressed"
				@keydown.native.enter.prevent="enterPressed"
				@keydown.native.up.prevent="keyArrows('up')"
				@keydown.native.down.prevent="keyArrows('down')"
			/>
		</span>
	</tv-popper>
</template>
<script>
import ThemeMixin from '../../mixins/theme.js';
import TransitionMixin from '../../mixins/transition.js';
import TvAutocompleteItem from './autocomplete-item.vue';
import TvPopper from '../popper/popper.vue';
import TvInput from '../input/input.vue';
import { getValueByPath, isEmpty } from '../../utils/utils.js';
const setWidth = {
	name: 'sameWidth',
	enabled: true,
	fn: ({ state }) => {
		state.styles.popper.width = `${state.rects.reference.width}px`;
	},
	phase: 'beforeWrite',
	requires: ['computeStyles'],
	effect: ({ state }) => {
		state.elements.popper.style.width = `${
			state.elements.reference.clientWidth
		}px`;
	}
};

export default {
	name: 'TvAutocomplete',
	mixins: [ThemeMixin, TransitionMixin],
	components: {
		'tv-autocomplete-item': TvAutocompleteItem,
		'tv-input': TvInput,
		'tv-popper': TvPopper
	},
	props: {
		className: {
			type: String,
			default: 'tv-autocomplete'
		},
		value: {
			type: [String, Number],
			default: null
		},
		data: {
			type: Array,
			default: () => []
		},
		field: {
			type: String,
			default: 'value'
		},
		openOnFocus: {
			type: Boolean,
			default: false
		},
		keepFirst: {
			type: Boolean,
			default: false
		},
		customFormatter: {
			type: Function,
			default: undefined
		},
		validateEvent: {
			type: Boolean,
			default: true
		},
		disabled: {
			type: Boolean,
			default: false
		},
		readonly: {
			type: Boolean,
			default: false
		},
		size: {
			type: String,
			default: null,
			validator: (value) => value == null || ['sm', 'lg'].indexOf(value) !== -1
		},
		autocompleate: {
			type: String,
			default: 'off'
		},
		maxHeight: {
			type: [String, Number],
			default: undefined
		},
		selectOnClickOut: {
			type: Boolean,
			default: false
		},
		tag: {
			type: String,
			default: 'div'
		},
		options: {
			type: Object,
			default: () => {}
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
		modifiers: {
			type: Array,
			default: () => [setWidth]
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
		}
	},
	data() {
		return {
			selected: null,
			hovered: null,
			isActive: false,
			newValue: this.value,
			isFocused: false
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
				this.placement,
				theme
			];
		},
		referenceClass() {
			const tag = `${this.className}-reference`;
			const theme = this.currentTheme.reference;
			return [
				tag,
				theme
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
		hasEmptySlot() {
			return !!this.$scopedSlots.empty;
		},
		contentStyle() {
			return {
				maxHeight: this.maxHeight === undefined
					? null : (isNaN(this.maxHeight) ? this.maxHeight : this.maxHeight + 'px')
			};
		}
	},
	watch: {
		isActive(value) {
			if (!value) {
				this.$nextTick(() => this.setHovered(null));
			}
		},
		value(value) {
			this.newValue = value;
		},
		newValue(value) {
			this.$emit('input', value);
			// Check if selected is invalid
			const currentValue = this.getValue(this.selected);
			if (currentValue && currentValue !== value) {
				this.setSelected(null, false);
			}
			// Close dropdown if input is clear or else open it
			if (this.isFocused && (!this.openOnFocus || value)) {
				this.isActive = !!value;
			}
		},
		data(value) {
			// Keep first option always pre-selected
			if (this.keepFirst) {
				this.selectFirstOption(value);
			}
		}
	},
	methods: {
		setHovered(option) {
			if (option === undefined) return;
			this.hovered = option;
		},
		setSelected(option, closeDropdown = true) {
			if (option === undefined) return;
			this.selected = option;
			this.$emit('select', this.selected);
			if (this.selected !== null) {
				this.newValue = this.clearOnSelect ? '' : this.getValue(this.selected);
			}
			closeDropdown && this.$nextTick(() => { this.isActive = false; });
		},
		selectFirstOption(options) {
			this.$nextTick(() => {
				if (options.length) {
					// If has visible data or open on focus, keep updating the hovered
					if (this.openOnFocus || (this.newValue !== '' && this.hovered !== options[0])) {
						this.setHovered(options[0]);
					}
				} else {
					this.setHovered(null);
				}
			});
		},
		clickedOutside(e) {
			if (!this.checkWhiteList(e)) {
				if (this.selectOnClickOut && isEmpty(this.selected) && this.hovered) {
					this.setSelected(this.hovered);
				}
				this.isActive = false;
			}
		},
		checkWhiteList(e) {
			return (
				this.elementContains(this.$el, e.target) ||
				this.elementContains(this.$refs.popper, e.target) ||
				this.elementContains(this.$refs.reference, e.target)
			);
		},
		elementContains(elm, otherElm) {
			if (typeof elm.contains === 'function') {
				return elm.contains(otherElm);
			}
			return false;
		},
		findMatch(value) {
			return this.data.find((option) => {
				const item = typeof option === 'object'
					? getValueByPath(option, this.field)
					: option;
				return item.toString().toLowerCase() === value.toLowerCase();
			});
		},
		getValue(option) {
			if (option === null) return;
			if (typeof this.customFormatter !== 'undefined') {
				return this.customFormatter(option);
			}
			return typeof option === 'object'
				? getValueByPath(option, this.field)
				: option;
		},
		enterPressed() {
			if (this.hovered === null) return;
			this.setSelected(this.hovered, !this.keepOpen);
		},
		tabPressed() {
			if (this.hovered === null) {
				this.isActive = false;
				return;
			}
			this.setSelected(this.hovered, !this.keepOpen);
		},
		keyArrows(direction) {
			const sum = direction === 'down' ? 1 : -1;
			if (this.isActive) {
				let index = this.data.indexOf(this.hovered) + sum;
				index = index > this.data.length - 1 ? this.data.length : index;
				index = index < 0 ? 0 : index;
				this.setHovered(this.data[index]);

				const list = this.$refs['popper-content'];
				const element = list.querySelectorAll('.tv-autocomplete-item')[index];
				if (!element) return;
				const visMin = list.scrollTop;
				const visMax = list.scrollTop + list.clientHeight - element.clientHeight;
				if (element.offsetTop < visMin) {
					list.scrollTop = element.offsetTop;
				} else if (element.offsetTop >= visMax) {
					list.scrollTop = (
						element.offsetTop -
                        list.clientHeight +
                        element.clientHeight
					);
				}
			} else {
				this.isActive = true;
			}
		},
		onFocus(event) {
			const currentValue = this.getValue(this.selected);
			if (currentValue === this.newValue) {
				this.$el.querySelector('input').select();
			}
			if (this.openOnFocus) {
				this.isActive = true;
				if (this.keepFirst) {
					this.selectFirstOption(this.data);
				} else if (currentValue === this.newValue) {
					const match = this.findMatch(this.newValue);
					if (!isEmpty(match)) {
						this.setHovered(match);
					}
				}
			}
			this.isFocused = true;
			this.$emit('focus', event);
		},
		onInput() {
			const currentValue = this.getValue(this.selected);
			if (currentValue && currentValue === this.newValue) return;
			this.$emit('typing', this.newValue);
			if (!this.keepFirst && !this.selected && this.newValue) {
				const match = this.findMatch(this.newValue);
				if (!isEmpty(match)) {
					this.setHovered(match);
				} else {
					this.setHovered(null);
				}
			}
		},
		onBlur(event) {
			this.isFocused = false;
			this.$emit('blur', event);
		}
	},
	created() {
		if (typeof window !== 'undefined') {
			document.addEventListener('click', this.clickedOutside);
		}
		this.newModifiers = [setWidth].concat(this.modifiers);
	},
	beforeDestroy() {
		if (typeof window !== 'undefined') {
			document.removeEventListener('click', this.clickedOutside);
		}
	}
};
</script>
