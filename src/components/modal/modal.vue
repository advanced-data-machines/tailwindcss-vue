<template>
	<custom-transition>
		<div :class="currentClass" v-if="isActive">
			<div :class="['absolute top-0 left-0 right-0 bottom-0', bgStyle]" @click="cancel('outside')" />
			<div class="relative">
				<component v-if="component" :is="component" v-bind="props" v-on="events" @close="close" />
				<div v-else-if="content" v-html="content" />
				<slot v-else />
			</div>
			<slot name="close" v-if="showX" :aria-close-label="ariaCloseLabel" :cancel="cancel">
				<a @click="cancel('x')" class="cursor-pointer pointer-events-auto absolute right-0 top-0 p-4" :aria-label="ariaCloseLabel">
					<svg class="fill-current h-6 w-6 text-white" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
				</a>
			</slot>
		</div>
	</custom-transition>
</template>
<script>
import { removeElement } from '../../utils/dom.js';
import ThemeMixin from '../../mixins/theme.js';
import CustomTransition from '../../components/transistions/custom-transition.vue';
export default {
	name: 'TvModal',
	provide() {
		return {
			closeModal: this.close,
			cancelModal: this.cancel
		};
	},
	components: {
		'custom-transition': CustomTransition
	},
	mixins: [ThemeMixin],
	props: {
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
		ariaCloseLabel: {
			type: String,
			default: 'close'
		},
		bgStyle: {
			type: String,
			default: 'bg-gray-900 opacity-75'
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
		currentClass() {
			const tag = this.$options._componentTag;
			const theme = this.currentTheme;
			// add tags first
			let classes = [
				tag
			];
			// base theme classes
			classes.push(theme.base);

			return classes;
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
