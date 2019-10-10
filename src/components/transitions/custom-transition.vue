<template>
	<component :is="componentType"
		type="animation"
		v-bind="$attrs"
		@before-enter="beforeEnter"
		@after-enter="afterEnter"
		@before-leave="beforeLeave"
		@leave="leave"
		@after-leave="afterLeave"
		:move-class="moveClass"
		:enter-active-class="enterClass"
		:leave-active-class="leaveClass"
	>
		<slot />
	</component>
</template>
<script>
// from https://github.com/BinarCode/vue2-transitions - repo does not look maintained
import Transition from './transition-mixin.js';
export default {
	name: 'CustomTransition',
	mixins: [Transition],
	props: {
		styles: {
			type: Object,
			default: () => {
				return {
					animationFillMode: 'both',
					animationTimingFunction: 'cubic-bezier(.25,.8,.50,1)'
				};
			}
		},
		type: {
			type: String,
			default: 'fade',
			validate: (val) => ['fade', 'slide', 'zoom'].indexOf(val) > -1
		},
		direction: {
			type: String,
			default: 'up',
			validate: (val) => ['up', 'down', 'left', 'right'].indexOf(val) > -1
		}
	},
	computed: {
		moveClass() {
			if (this.type === 'fade') return 'fade-move';
			return 'base-move';
		},
		enterClass() {
			switch (this.type) {
			case 'fade':
				return 'fadeIn';
			case 'zoom':
				return 'zoomIn';
			default:
				switch (this.direction) {
				case 'up':
					return 'slideYIn';
				case 'left':
					return 'slideXLeftIn';
				case 'down':
					return 'slideYDownIn';
				case 'right':
					return 'slideXRightIn';
				default:
					return 'slideYIn';
				}
			}
		},
		leaveClass() {
			switch (this.type) {
			case 'fade':
				return 'fadeOut';
			case 'zoom':
				return 'zoomOut';
			default:
				switch (this.direction) {
				case 'up':
					return 'slideYOut';
				case 'left':
					return 'slideXLeftOut';
				case 'down':
					return 'slideYDownOut';
				case 'right':
					return 'slideXRightOut';
				default:
					return 'slideYOut';
				}
			}
		}
	}
};
</script>
