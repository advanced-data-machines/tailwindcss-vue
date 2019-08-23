<template>
	<fade-in-transition :duration="{ leave: 100, enter: 300 }" :delay="{ leave: 0, enter: 400 }">
		<div v-if="!collapse" class="cursor-pointer absolute inset-y-0 right-0 flex items-center pl-1 pr-4">
			<svg class="fill-current h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" :style="rotate">
				<path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
			</svg>
		</div>
	</fade-in-transition>
</template>
<script>
import FadeInTransition from '../transistions/fade-in-transition.vue';
export default {
	name: 'TvMenuArrow',
	components: {
		'fade-in-transition': FadeInTransition
	},
	props: {
		collapse: {
			type: Boolean,
			default: false
		},
		opened: {
			type: Boolean,
			default: false
		}
	},
	computed: {
		rotate() {
			const turn = this.opened ? 0 : -90;
			return { transform: `rotate(${turn}deg)`, transition: 'transform .3s' };
		}
	}
};
</script>
