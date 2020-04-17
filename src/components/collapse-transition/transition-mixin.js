export default {
	inheritAttrs: false,
	props: {
		duration: {
			type: [Number, Object],
			default: 300
		},
		delay: {
			type: [Number, Object],
			default: 0
		},
		group: {
			type: Boolean,
			default: false
		},
		origin: {
			type: String,
			default: ''
		},
		styles: {
			type: Object,
			default: () => {
				return {
					animationFillMode: 'both',
					animationTimingFunction: 'ease-out'
				};
			}
		}
	},
	computed: {
		componentType() {
			return this.group ? 'transition-group' : 'transition';
		}
	},
	methods: {
		beforeEnter(el) {
			const enterDuration = this.duration.enter ? this.duration.enter : this.duration;
			el.style.animationDuration = `${enterDuration}ms`;

			const enterDelay = this.delay.enter ? this.delay.enter : this.delay;
			el.style.animationDelay = `${enterDelay}ms`;

			this.setStyles(el);
			this.$emit('before-enter', el);
		},
		afterEnter(el) {
			this.cleanUpStyles(el);
			this.$emit('after-enter', el);
		},
		beforeLeave(el) {
			const leaveDuration = this.duration.leave ? this.duration.leave : this.duration;
			el.style.animationDuration = `${leaveDuration}ms`;

			const leaveDelay = this.delay.leave ? this.delay.leave : this.delay;
			el.style.animationDelay = `${leaveDelay}ms`;

			this.setStyles(el);
			this.$emit('before-leave', el);
		},
		leave(el) {
			this.setAbsolutePosition(el);
			this.$emit('leave', el);
		},
		afterLeave(el) {
			this.cleanUpStyles(el);
			this.$emit('after-leave', el);
		},
		setStyles(el) {
			this.setTransformOrigin(el);
			Object.keys(this.styles).forEach(key => {
				const styleValue = this.styles[key];
				if (styleValue) {
					el.style[key] = styleValue;
				}
			});
		},
		cleanUpStyles(el) {
			Object.keys(this.styles).forEach(key => {
				const styleValue = this.styles[key];
				if (styleValue) {
					el.style[key] = '';
				}
			});
			el.style.animationDuration = '';
			el.style.animationDelay = '';
		},
		setAbsolutePosition(el) {
			if (this.group) {
				el.style.position = 'absolute';
			}
			return this;
		},
		setTransformOrigin(el) {
			if (this.origin) {
				el.style.transformOrigin = this.origin;
			}
			return this;
		}
	}
};
