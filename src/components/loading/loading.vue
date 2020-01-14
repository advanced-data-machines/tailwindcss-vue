<template>
	<transition name="custom" enter-active-class="animated fadeIn fast" leave-active-class="animated fadeOut fast">
		<div v-if="isActive">
			<slot>
				<tv-icon icon="loading" />
			</slot>
		</div>
	</transition>
</template>
<script>
import { HTMLElement } from '@/utils/ssr.js';
import { removeElement } from '@/utils/dom.js';
export default {
	name: 'TvLoading',
	props: {
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
