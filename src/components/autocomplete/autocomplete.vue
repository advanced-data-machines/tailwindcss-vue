<template>
	<div> 
		<tv-popper
			:tag="tag"
			:placement="placement"
			:can-close="canClose"
			:disabled="disabled"
			:options="options"
			:force-show="forceShow"
			:delay-on-mouse-over="delayOnMouseOver"
			:delay-on-mouse-out="delayOnMouseOut"
			:custom-offset="customOffset"
			:append-to-body="appendToBody"
			:prevent-mobile="preventMobile"
		>
			<tv-input />
		</tv-popper>
	</div>
</template>
<script>
import Emitter from '../../mixins/emitter.js';
import ThemeMixin from '../../mixins/theme.js';
import TvPopper from '../popper/popper.vue';
import TvInput from '../input/input.vue';
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
		value: {
			type: [String, Number],
			default: null
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
		customOffset: {
			type: [Function, Array],
			default: () => [0, 5]
		},
		appendToBody: {
			type: Boolean,
			default: false
		}
	}
};
</script>
