<template>
	<transition name="custom" enter-active-class="animated fadeIn faster delay-300ms" leave-active-class="animated fadeOut none">
		<div v-if="!collapse" class="cursor-pointer absolute inset-y-0 right-0 flex items-center pl-1 pr-4">
			<svg class="fill-current h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" :style="rotate">
				<path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z" />
			</svg>
		</div>
	</transition>
</template>
<script>
export default {
	name: 'TvMenuArrow',
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
			const turn = this.opened ? 90 : 0;
			return { transform: `rotate(${turn}deg)`, transition: 'transform .3s' };
		}
	}
};
</script>
