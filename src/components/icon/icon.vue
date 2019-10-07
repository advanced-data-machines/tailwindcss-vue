<template>
	<span :class="currentWrapperClass" v-if="wrapIcon">
		<i :class="newIcon" />
	</span>
	<i v-else :class="newIcon" />
</template>
<script>
import ThemeMixin from '../../mixins/theme.js';
export default {
	name: 'TvIcon',
	mixins: [ThemeMixin],
	props: {
		wrapIcon: {
			type: Boolean,
			default: false
		},
		icon: {
			type: String,
			default: ''
		}
	},
	computed: {
		newIcon() {
			// TODO: expand to allow multiple icon packs
			return `mdi mdi-${this.icon}`;
		},
		currentWrapperClass() {
			const tag = this.$options._componentTag;
			const theme = this.currentTheme.wrapper;
			return [
				`${tag}-wrapper`,
				theme.base
			];
		}
	}
};
</script>
