<template>
	<a role="button" class="cursor-pointer flex items-center" @click.prevent="handleClick">
		<svg class="fill-current h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" :style="rotate">
			<path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z" />
		</svg>
	</a>
</template>
<script>
export default {
	name: 'TvTableArrow',
	props: {
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
	},
	methods: {
		handleClick() {
			this.$emit('click');
		}
	}
};
</script>
