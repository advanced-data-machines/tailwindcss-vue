<template>
	<section class="px-4">
		<h1 class="text-3xl text-teal-300">Resizable</h1>
		<tv-resizable>
			Resize Me!
			<div slot="resizable-b" class="w-full"><tv-icon icon="drag-horizontal" class="block w-4 mx-auto bg-white" /></div>
		</tv-resizable>
	</section>
</template>
<script>
export default {
	name: 'Resizable',
	data() {
		return {
			value: []
		};
	},
	methods: {
	}
};
</script>
