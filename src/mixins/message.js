export default {
	props: {
		active: {
			type: Boolean,
			default: true
		},
		variant: {
			type: String,
			default: null,
			validator: (value) => value == null || ['default', 'primary', 'info', 'success', 'danger', 'warning'].indexOf(value) > -1
		},
		closable: {
			type: Boolean,
			default: true
		},
		message: {
			type: String,
			default: null
		},
		autoClose: {
			type: Boolean,
			default: false
		},
		duration: {
			type: Number,
			default: 3000
		}
	},
	data() {
		return {
			isActive: this.active
		};
	},
	watch: {
		active(value) {
			// update isActive if outside prop changes
			this.isActive = value;
		},
		isActive(value) {
			if (value) {
				// set auto close
				this.setAutoClose();
			} else {
				// not active so clear timeout if available
				if (this.timer) {
					clearTimeout(this.timer);
				}
			}
		}
	},
	methods: {
		close() {
			this.isActive = false;
			this.$emit('close');
			// update .sync modifier (v-on:update:active)
			this.$emit('update:active', false);
		},
		setAutoClose() {
			if (this.autoClose) {
				this.timer = setTimeout(() => {
					if (this.isActive) this.close();
				}, this.duration);
			}
		}
	},
	mounted() {
		this.setAutoClose();
	}
};
