<template>
	<transition
		:transition="transition"
		:enter-class="enterClass"
		:enter-active-class="enterActiveClass"
		:enter-to-class="enterToClass"
		:leave-class="leaveClass"
		:leave-active-class="leaveActiveClass"
		:leave-to-class="leaveToClass"
	>
		<div v-show="isActive" :class="['relative', currentClass]">
			<slot name="close" v-if="closable" :aria-close-label="ariaCloseLabel" :close="close">
				<a @click="close" class="cursor-pointer pointer-events-auto absolute inset-y-0 right-0 flex items-center pl-1 pr-4" :aria-label="ariaCloseLabel">
					<svg class="fill-current h-6 w-6" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
				</a>
			</slot>
			<slot>
				<p v-html="message" />
			</slot>
		</div>
	</transition>
</template>
<script>
import ThemeMixin from '../../mixins/theme.js';
import TransitionMixin from '../../mixins/transition.js';
import MessageMixin from '../../mixins/message.js';
export default {
	name: 'TvAlert',
	mixins: [MessageMixin, ThemeMixin, TransitionMixin],
	props: {
		className: {
			type: String,
			default: 'tv-alert'
		},
		ariaCloseLabel: {
			type: String,
			default: 'close'
		}
	},
	computed: {
		currentClass() {
			const tag = this.className;
			const theme = this.currentTheme;
			const variant = this.variant || 'default';
			return [
				tag,
				`is-${variant}`,
				theme.base,
				`${theme.normal[variant]}`
			];
		}
	}
};
</script>
