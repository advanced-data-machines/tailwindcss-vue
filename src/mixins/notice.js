import { removeElement } from '../utils/dom.js';
export default {
	props: {
		message: {
			type: String,
			default: null
		},
		duration: {
			type: Number,
			default: 3000
		},
		queue: {
			type: Boolean,
			default: undefined
		},
		position: {
			type: String,
			default: 'top',
			validator(value) {
				return [
					'top-right',
					'top',
					'top-left',
					'bottom-right',
					'bottom',
					'bottom-left'
				].indexOf(value) > -1;
			}
		},
		container: {
			type: String,
			default: null
		}
	},
	data() {
		return {
			isActive: false,
			parentTop: null,
			parentBottom: null,
			newContainer: this.container
		};
	},
	computed: {
		correctParent() {
			switch (this.position) {
			case 'top-right':
			case 'top':
			case 'top-left':
				return this.parentTop;

			case 'bottom-right':
			case 'bottom':
			case 'bottom-left':
				return this.parentBottom;
			}
		},
		currentPostionCss() {
			switch (this.position) {
			case 'top':
			case 'bottom':
				return 'center';
			case 'top-right':
			case 'bottom-right':
				return 'right';
			case 'top-left':
			case 'bottom-left':
				return 'left';
			}
		}
	},
	methods: {
		shouldQueue() {
			const queue = this.queue !== undefined
				? this.queue
				: true;

			if (!queue) return false;
			return (
				this.parentTop.childElementCount > 0 ||
                this.parentBottom.childElementCount > 0
			);
		},
		close() {
			clearTimeout(this.timer);
			this.isActive = false;

			// Timeout for the animation complete before destroying
			setTimeout(() => {
				this.$destroy();
				removeElement(this.$el);
			}, 300);
		},

		showNotice() {
			if (this.shouldQueue()) {
				// Call recursively if should queue
				setTimeout(() => this.showNotice(), 250);
				return;
			}
			this.correctParent.insertAdjacentElement('afterbegin', this.$el);
			this.isActive = true;

			if (!this.indefinite) {
				this.timer = setTimeout(() => this.close(), this.duration);
			}
		},

		setupContainer() {
			this.parentTop = document.querySelector('.notices.is-top');
			this.parentBottom = document.querySelector('.notices.is-bottom');

			if (this.parentTop && this.parentBottom) return;

			if (!this.parentTop) {
				this.parentTop = document.createElement('div');
				this.parentTop.className = 'notices is-top fixed flex top-0 right-0 bottom-0 left-0 p-6 overflow-hidden z-50 pointer-events-none flex-col';
			}

			if (!this.parentBottom) {
				this.parentBottom = document.createElement('div');
				this.parentBottom.className = 'notices is-bottom fixed flex top-0 right-0 bottom-0 left-0 p-6 overflow-hidden z-50 pointer-events-none flex-col-reverse';
			}

			const container = document.querySelector(this.newContainer) || document.body;

			container.appendChild(this.parentTop);
			container.appendChild(this.parentBottom);

			if (this.newContainer) {
				this.parentTop.classList.add('has-custom-container');
				this.parentBottom.classList.add('has-custom-container');
			}
		}
	},
	beforeMount() {
		this.setupContainer();
	},
	mounted() {
		this.showNotice();
	}
};
