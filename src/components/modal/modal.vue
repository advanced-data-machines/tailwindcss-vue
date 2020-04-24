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
		<div :role="ariaRole" :class="wrapperClass" v-if="isActive">
			<div :class="backdropClass" @click="cancel('outside')" />
			<div :class="[cardClass, width]">
				<component v-if="component" :is="component" v-bind="props" v-on="events" @close="close" />
				<div v-else-if="content" v-html="content" />
				<slot v-else />
			</div>
			<slot name="close" v-if="showX" :aria-close-label="ariaCloseLabel" :cancel="cancel">
				<a @click="cancel('x')" class="cursor-pointer pointer-events-auto absolute right-0 top-0 p-4 text-white" :aria-label="ariaCloseLabel">
					<svg class="fill-current h-6 w-6" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
				</a>
			</slot>
		</div>
	</transition>
</template>
<script>
import { removeElement } from '../../utils/dom.js';
import ThemeMixin from '../../mixins/theme.js';
import TransitionMixin from '../../mixins/transition.js';
export default {
	name: 'TvModal',
	provide() {
		return {
			confirmModal: this.confirm,
			cancelModal: this.cancel
		};
	},
	mixins: [ThemeMixin, TransitionMixin],
	props: {
		className: {
			type: String,
			default: 'tv-modal'
		},
		active: {
			type: Boolean,
			default: false
		},
		component: {
			type: [Object, Function],
			default: () => {}
		},
		content: {
			type: String,
			default: null
		},
		programmatic: {
			type: Boolean,
			default: null
		},
		props: {
			type: Object,
			default: () => {}
		},
		events: {
			type: Object,
			default: () => {}
		},
		canCancel: {
			type: [Array, Boolean],
			default: () => ['escape', 'x', 'button']
		},
		onCancel: {
			type: Function,
			default: () => {}
		},
		onConfirm: {
			type: Function,
			default: () => {}
		},
		ariaCloseLabel: {
			type: String,
			default: 'close'
		},
		hasCard: {
			type: Boolean,
			default: true
		},
		width: {
			type: String,
			default: 'max-w-md'
		},
		ariaRole: {
			type: String,
			default: 'dialog',
			validator: (v) => ['dialog', 'alertDialog'].indexOf(v) > -1
		}
	},
	data() {
		return {
			isActive: this.active
		};
	},
	computed: {
		cancelOptions() {
			return typeof this.canCancel === 'boolean'
				? this.canCancel
					? ['escape', 'x', 'button']
					: []
				: this.canCancel;
		},
		showX() {
			return this.cancelOptions.indexOf('x') > -1;
		},
		wrapperClass() {
			const tag = `${this.className}-wrapper`;
			const theme = this.currentTheme.wrapper;
			return [
				tag,
				theme
			];
		},
		backdropClass() {
			const tag = `${this.className}-backdrop`;
			const theme = this.currentTheme.backdrop;
			return [
				tag,
				theme
			];
		},
		cardClass() {
			const tag = `${this.className}-card`;
			const theme = this.currentTheme.card;
			return [
				tag,
				this.hasCard ? theme : ''
			];
		}
	},
	watch: {
		active(value) {
			this.isActive = value;
		},
		isActive() {
			this.handleScroll();
		}
	},
	methods: {
		handleScroll() {
			if (typeof window === 'undefined') return;
			if (this.scroll === 'clip') {
				if (this.isActive) {
					document.documentElement.classList.add('overflow-hidden');
				} else {
					document.documentElement.classList.remove('overflow-hidden');
				}
				return;
			}
			this.savedScrollTop = !this.savedScrollTop
				? document.documentElement.scrollTop
				: this.savedScrollTop;
			if (this.isActive) {
				document.body.classList.add('fixed', 'overflow-y-hidden', 'w-full', 'bottom-0');
			} else {
				document.body.classList.remove('fixed', 'overflow-y-hidden', 'w-full', 'bottom-0');
			}
			if (this.isActive) {
				document.body.style.top = `-${this.savedScrollTop}px`;
				return;
			}
			document.documentElement.scrollTop = this.savedScrollTop;
			document.body.style.top = null;
			this.savedScrollTop = null;
		},
		cancel(method) {
			if (this.cancelOptions.indexOf(method) < 0) return;
			this.onCancel.apply(null, arguments);
			this.close();
		},
		confirm() {
			this.onConfirm.apply(null, arguments);
			this.close();
		},
		close() {
			this.$emit('close');
			this.$emit('update:active', false);
			// timeout for the animation complete before destroying
			if (this.programmatic) {
				this.isActive = false;
				setTimeout(() => {
					this.$destroy();
					removeElement(this.$el);
				}, 150);
			}
		},
		keyPress(event) {
			// esc key
			if (this.isActive && event.keyCode === 27) this.cancel('escape');
		}
	},
	created() {
		if (typeof window !== 'undefined') {
			document.addEventListener('keyup', this.keyPress);
		}
	},
	beforeMount() {
		this.programmatic && document.body.appendChild(this.$el);
	},
	mounted() {
		if (this.programmatic) this.isActive = true;
		else if (this.isActive) this.handleScroll();
	},
	beforeDestroy() {
		if (typeof window !== 'undefined') {
			document.removeEventListener('keyup', this.keyPress);
			// reset scroll
			document.documentElement.classList.remove('overflow-hidden');
			const savedScrollTop = !this.savedScrollTop
				? document.documentElement.scrollTop
				: this.savedScrollTop;
			document.body.classList.remove('fixed', 'overflow-y-hidden', 'w-full', 'bottom-0');
			document.documentElement.scrollTop = savedScrollTop;
			document.body.style.top = null;
		}
	}
};
</script>
