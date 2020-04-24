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
		<div v-if="isActive" :class="wrapperClass">
			<div :class="backDropClass" @click="cancel" />
			<slot>
				<div :class="['loading-icon relative', spinnerClass]" />
			</slot>
		</div>
	</transition>
</template>
<script>
import { HTMLElement } from '../../utils/ssr.js';
import { removeElement } from '../../utils/dom.js';
import ThemeMixin from '../../mixins/theme.js';
import TransitionMixin from '../../mixins/transition.js';
export default {
	name: 'TvLoading',
	mixins: [ThemeMixin, TransitionMixin],
	props: {
		className: {
			type: String,
			default: 'tv-loading'
		},
		active: {
			type: Boolean,
			default: false
		},
		programmatic: {
			type: Boolean,
			default: false
		},
		container: {
			type: [Object, Function, HTMLElement],
			default: undefined
		},
		isFullpage: {
			type: Boolean,
			default: false
		},
		canCancel: {
			type: Boolean,
			default: false
		},
		onCancel: {
			type: Function,
			default: () => {}
		}
	},
	computed: {
		wrapperClass() {
			const tag = this.className;
			const theme = this.currentTheme;
			const visibility = this.isActive ? 'active' : 'default';
			const state = this.isFullpage ? 'fullPage' : 'default';
			return [
				tag,
				`is-${visibility}`,
				theme.wrapper.base,
				theme.wrapper.state[state],
				theme.wrapper.visibility[visibility]
			];
		},
		backDropClass() {
			return [
				`${this.className}-backdrop`,
				this.currentTheme.backdrop
			];
		},
		spinnerClass() {
			return [
				`${this.className}-spinner`,
				this.currentTheme.spinner
			];
		}
	},
	data() {
		return {
			isActive: this.active
		};
	},
	watch: {
		active(value) {
			this.isActive = value;
		}
	},
	methods: {
		/**
        * Close the Modal if canCancel.
        */
		cancel() {
			if (!this.canCancel || !this.isActive) return;
			this.close();
		},
		/**
        * Emit events, and destroy modal if it's programmatic.
        */
		close() {
			this.onCancel.apply(null, arguments);
			this.$emit('close');
			this.$emit('update:active', false);
			// Timeout for the animation complete before destroying
			if (this.programmatic) {
				this.isActive = false;
				setTimeout(() => {
					this.$destroy();
					removeElement(this.$el);
				}, 150);
			}
		},
		/**
        * Keypress event that is bound to the document.
        */
		keyPress(event) {
			// Esc key
			if (event.keyCode === 27) this.cancel();
		}
	},
	created() {
		if (typeof window !== 'undefined') {
			document.addEventListener('keyup', this.keyPress);
		}
	},
	beforeMount() {
		/**
        * Insert the Loading component in body tag
		* only if it's programmatic
        */
		if (this.programmatic) {
			if (!this.container) {
				document.body.appendChild(this.$el);
			} else {
				this.isFullPage = false;
				this.container.appendChild(this.$el);
			}
		}
	},
	mounted() {
		if (this.programmatic) this.isActive = true;
	},
	beforeDestroy() {
		if (typeof window !== 'undefined') {
			document.removeEventListener('keyup', this.keyPress);
		}
	}
};
</script>
