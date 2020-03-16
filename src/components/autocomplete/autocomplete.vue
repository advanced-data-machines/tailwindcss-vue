<template>
	<tv-popper
		:tag="tag"
		:placement="placement"
		:disabled="disabled"
		:options="options"
		:force-show="isActive"
		:delay-on-mouse-over="delayOnMouseOver"
		:delay-on-mouse-out="delayOnMouseOut"
		:custom-offset="customOffset"
		:append-to-body="appendToBody"
		:class="wrapperClass"
	>
		<span :class="popperClass" role="tooltip">
			<div ref="dropdown">
				<a
					v-for="(option, index) in data"
					:key="index"
					@click="setSelected(option)"
					class="block min-w-md"
				>
					<slot v-if="$scopedSlots['default']" />
					<span v-else>
						{{ getValue(option, true) }}
					</span>
				</a>
			</div>
			<div data-popper-arrow :class="arrowClass" />
		</span>
		<span slot="reference" :class="referenceClass">
			<tv-input
				ref="input"
				v-model="newValue"
				type="text"
				:size="size"
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
import Emitter from '../../mixins/emitter.js';
import ThemeMixin from '../../mixins/theme.js';
import TvPopper from '../popper/popper.vue';
import TvInput from '../input/input.vue';
import { getValueByPath } from '@/utils/utils.js';
export default {
	name: 'TvAutocomplete',
	mixins: [Emitter, ThemeMixin],
	components: {
		'tv-input': TvInput,
		'tv-popper': TvPopper
	},
	props: {
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
		openOnSelect: {
			type: Boolean,
			default: true,
		},
		keepFirst: {
			type: Boolean,
			default: true
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
		whiteList() {
			const whiteList = [];
			whiteList.push(this.$refs.input.$el.querySelector('input'));
			whiteList.push(this.$refs.dropdown);
			// Add all chidren from dropdown
			if (this.$refs.dropdown !== undefined) {
				const children = this.$refs.dropdown.querySelectorAll('*');
				for (const child of children) {
					whiteList.push(child);
				}
			}
			return whiteList;
		},
		wrapperClass() {
			const tag = `${this.$options._componentTag}-wrapper`;
			const theme = this.currentTheme;
			return [
				tag,
				theme.wrapper
			];
		},
		popperClass() {
			const tag = `${this.$options._componentTag}-popper`;
			const theme = this.currentTheme;
			return [
				tag,
				`${tag}-${this.placement}`,
				theme.popper
			];
		},
		referenceClass() {
			const tag = `${this.$options._componentTag}-reference`;
			const theme = this.currentTheme.reference;
			const state = this.disabled ? 'disabled' : 'default';
			return [
				tag,
				theme.base,
				`${tag}-${state}`,
				theme.state[state]
			];
		},
		arrowClass() {
			const tag = `${this.$options._componentTag}-arrow`;
			const theme = this.currentTheme.arrow;
			return [
				tag,
				theme
			];
		},
		optionsClass() {
			const tag = `${this.$options._componentTag}-option`;
			const theme = this.currentTheme.option;
			const state = this.isClickable ? 'normal' : 'disabled';
			const active = this.isActive ? 'active' : 'default';
			return [
				tag,
				`${tag}-${state}-${active}`,
				theme.padding,
				theme[state][active]
			];
		},
	},
	watch: {
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
			if (this.hasFocus && (!this.openOnFocus || value)) {
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
			console.log(closeDropdown);
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
		clickedOutside(event) {
			if (this.whiteList.indexOf(event.target) < 0) this.isActive = false;
		},
		keyArrows(direction) {
			const sum = direction === 'down' ? 1 : -1;
			if (this.isActive) {
				let index = this.data.indexOf(this.hovered) + sum;
				index = index > this.data.length - 1 ? this.data.length : index;
				index = index < 0 ? 0 : index;
				this.setHovered(this.data[index]);
			} else {
				this.isActive = true;
			}
		},
		onFocus(event) {
			if (this.getValue(this.selected) === this.newValue) {
				this.$el.querySelector('input').select();
			}
			if (this.openOnFocus) {
				this.isActive = true;
				if (this.keepFirst) {
					this.selectFirstOption(this.data);
				}
			}
			this.hasFocus = true;
			this.$emit('focus', event);
		},
		onInput() {
			const currentValue = this.getValue(this.selected);
			if (currentValue && currentValue === this.newValue) return;
			this.$emit('typing', this.newValue);
		},
		onBlur(event) {
			this.isFocused = false;
			this.$emit('blur', event);
		}
	}
};
</script>
