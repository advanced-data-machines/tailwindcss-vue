<template>
	<tv-popper :trigger="trigger" append-to-body>
		<span>{{ label }}</span>
		<span slot="reference"><slot /></span>
	</tv-popper>
</template>
<script>
import TvPopper from '../popper/popper.vue';
export default {
	name: 'TvTooltip',
	components: {
		'tv-popper': TvPopper
	},
	props: {
		label: {
			type: String,
			default: null
		},
		trigger: {
			type: String,
			default: 'click',
			validator: (n) => ['click', 'hover'].indexOf(n) > -1
		}
	}
};
</script>
