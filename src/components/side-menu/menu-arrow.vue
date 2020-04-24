<template>
	<transition :transition="transition"
		:enter-class="enterClass"
		:enter-active-class="enterActiveClass"
		:enter-to-class="enterToClass"
		:leave-class="leaveClass"
		:leave-active-class="leaveActiveClass"
		:leave-to-class="leaveToClass"
	>
		<div v-if="!collapse" :class="['cursor-pointer absolute inset-y-0 right-0 flex items-center', menuArrowClass]">
			<svg class="fill-current h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" :style="rotate">
				<path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z" />
			</svg>
		</div>
	</transition>
</template>
<script>
import TransitionMixin from '../../mixins/transition.js';
export default {
	name: 'TvMenuArrow',
	mixins: [TransitionMixin],
	props: {
		collapse: {
			type: Boolean,
			default: false
		},
		opened: {
			type: Boolean,
			default: false
		},
		menuArrowClass: {
			type: String,
			default: null
		},
		enterActiveClass: {
			type: String,
			default: 'ease-out duration-300 delay-300'
		},
		leaveActiveClass: {
			type: String,
			default: 'ease-out duration-0'
		}
	},
	computed: {
		rotate() {
			const turn = this.opened ? 90 : 0;
			return { transform: `rotate(${turn}deg)`, transition: 'transform .3s' };
		}
	}
};
</script>
