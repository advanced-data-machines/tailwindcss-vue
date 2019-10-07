<template>
	<div :class="currentClass">
		<tv-alert :active="isActive" v-bind="$options.propsData" @close="close" />
	</div>
</template>
<script>
import NoticeMixin from '../../mixins/notice.js';
import ThemeMixin from '../../mixins/theme.js';
export default {
	name: 'TvAlertNotice',
	mixins: [NoticeMixin, ThemeMixin],
	props: {
		indefinite: {
			type: Boolean,
			default: false
		}
	},
	computed: {
		currentClass() {
			const tag = this.$options.name.split(/(?=[A-Z])/).join('-').toLowerCase();
			const theme = this.currentTheme;
			const position = this.currentPostionCss;
			return [
				tag,
				`${tag}-${position}`,
				theme.base,
				`${theme.position[position]}`
			];
		}
	}
};
</script>
