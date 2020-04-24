<template>
	<div :class="currentClass">
		<transition
			:transition="transition"
			:enter-class="enterClass"
			:enter-active-class="enterActiveClass"
			:enter-to-class="enterToClass"
			:leave-class="leaveClass"
			:leave-active-class="leaveActiveClass"
			:leave-to-class="leaveToClass"
		>
			<template v-if="isActive">
				<tv-alert v-bind="$options.propsData" @close="close" />
			</template>
		</transition>
	</div>
</template>
<script>
import NoticeMixin from '../../mixins/notice.js';
import ThemeMixin from '../../mixins/theme.js';
import TransitionMixin from '../../mixins/transition.js';
import TvAlert from './alert.vue';
export default {
	name: 'TvAlertNotice',
	components: {
		'tv-alert': TvAlert
	},
	mixins: [NoticeMixin, ThemeMixin, TransitionMixin],
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
