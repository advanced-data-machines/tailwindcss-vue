<template>
	<tv-alert v-bind="$options.propsData" @close="close" />
</template>
<script>
import NoticeMixin from '../../mixins/notice.js';
export default {
	name: 'AlertNotice',
	mixins: [NoticeMixin],
	props: {
		indefinite: {
			type: Boolean,
			default: false
		}
	},
	mounted() {
		console.log('mount');
	}
};
</script>
