<template>
	<component :is="componentType"
		type="animation"
		v-bind="$attrs"
		@before-enter="beforeEnter"
		@after-enter="afterEnter"
		@before-leave="beforeLeave"
		@leave="leave"
		@after-leave="afterLeave"
		enter-active-class="slideYIn"
		move-class="slide-move"
		leave-active-class="slideYOut"
	>
		<slot />
	</component>
</template>
<script>
import Transition from './transistion-mixin.js';
export default {
	name: 'SlideYUpTransition',
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
		}
	}
};
</script>
<style>
	.slide-move {
		transition: transform .3s;
	}
	@keyframes slideYIn {
		from {
			opacity: 0;
			transform: translateY(-15px);
		}

		to {
			opacity: 1;
		}
	}
	.slideYIn {
		animation-name: slideYIn;
	}
	@keyframes slideYOut {
		from {
			opacity: 1;
		}

		to {
			opacity: 0;
			transform: translateY(-15px);
		}
	}
	.slideYOut {
		animation-name: slideYOut;
	}
</style>
