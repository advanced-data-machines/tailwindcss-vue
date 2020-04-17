<template>
	<div :class="currentClass" :style="style">
		<slot />
		<template v-for="el in active">
			<div :class="'resizable-' + el" :key="el">
				<slot :name="'resizable-' + el" />
			</div>
		</template>
	</div>
</template>
<script>
const ELEMENT_MASK = {
	'resizable-r': { bit: 0b0001, cursor: 'e-resize' },
	'resizable-b': { bit: 0b0010, cursor: 's-resize' },
	'resizable-l': { bit: 0b0100, cursor: 'w-resize' }
};
export default {
	name: 'TvResizable',
	props: {
		className: {
			type: String,
			default: 'tv-resizable'
		},
		width: {
			type: [Number, String],
			default: '100%'
		},
		minWidth: {
			type: Number,
			default: 0
		},
		maxWidth: {
			type: Number,
			default: undefined
		},
		height: {
			type: [Number, String],
			default: 'auto'
		},
		minHeight: {
			type: Number,
			default: 0
		},
		maxHeight: {
			type: Number,
			default: undefined
		},
		active: {
			type: String,
			default: 'b',
			validator: (value) => ['r', 'b', 'l'].indexOf(value) > -1
		},
		fitParent: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			w: this.width,
			h: this.height,
			minW: this.minWidth,
			minH: this.minHeight,
			maxW: this.maxWidth,
			maxH: this.maxHeight,
			mouseX: 0,
			mouseY: 0,
			offsetX: 0,
			offsetY: 0,
			parent: { width: 0, height: 0 },
			resizeState: 0
		};
	},
	computed: {
		currentClass() {
			const tag = this.className;
			return [
				tag
			];
		},
		style() {
			return {
				width: typeof this.w === 'number' ? this.w + 'px' : this.w,
				height: typeof this.h === 'number' ? this.h + 'px' : this.h
			};
		}
	},
	methods: {
		emitEvent(eventName) {
			this.$emit(eventName, { eventName, width: this.w, height: this.h });
		},
		handleMove(event) {
			if (this.resizeState !== 0) {
				let diffX = event.clientX - this.mouseX + this.offsetX;
				let diffY = event.clientY - this.mouseY + this.offsetY;
				this.offsetX = this.offsetY = 0;
				if (this.resizeState & ELEMENT_MASK['resizable-r'].bit) {
					if (this.w + diffX < this.minW) {
						this.offsetX = (diffX - (diffX = this.minW - this.w));
					} else if (this.maxW && this.w + diffX > this.maxW && (!this.fitParent || this.w + this.l < this.parent.width)) {
						this.offsetX = (diffX - (diffX = this.maxW - this.w));
					} else if (this.fitParent && this.l + this.w + diffX > this.parent.width) {
						this.offsetX = (diffX - (diffX = this.parent.width - this.l - this.w));
					}
					this.w += diffX;
				}
				if (this.resizeState & ELEMENT_MASK['resizable-b'].bit) {
					if (this.h + diffY < this.minH) {
						this.offsetY = (diffY - (diffY = this.minH - this.h));
					} else if (this.maxH && this.h + diffY > this.maxH && (!this.fitParent || this.h + this.t < this.parent.height)) {
						this.offsetY = (diffY - (diffY = this.maxH - this.h));
					} else if (this.fitParent && this.t + this.h + diffY > this.parent.height) {
						this.offsetY = (diffY - (diffY = this.parent.height - this.t - this.h));
					}
					this.h += diffY;
				}
				if (this.resizeState & ELEMENT_MASK['resizable-l'].bit) {
					if (this.w - diffX < this.minW) {
						this.offsetX = (diffX - (diffX = this.w - this.minW));
					} else if (this.maxW && this.w - diffX > this.maxW && this.l > 0) {
						this.offsetX = (diffX - (diffX = this.w - this.maxW));
					} else if (this.fitParent && this.l + diffX < 0) {
						this.offsetX = (diffX - (diffX = -this.l));
					}
					this.l += diffX;
					this.w -= diffX;
				}

				this.mouseX = event.clientX;
				this.mouseY = event.clientY;
				this.emitEvent('resize:move');
			}
		},
		handleDown(event) {
			for (const elClass in ELEMENT_MASK) {
				if (this.$el.contains(event.target) && (event.target.closest && (event.target.closest(`.${elClass}`) || event.target.classList.contains(elClass)))) {
					document.body.style.cursor = ELEMENT_MASK[elClass].cursor;
					event.preventDefault && event.preventDefault();
					this.offsetX = this.offsetY = 0;
					this.mouseX = event.clientX;
					this.mouseY = event.clientY;
					this.resizeState = ELEMENT_MASK[elClass].bit;
					this.parent.height = this.$el.parentElement.clientHeight;
					this.parent.width = this.$el.parentElement.clientWidth;
					this.emitEvent('resize:start');
					break;
				}
			}
		},
		handleUp() {
			if (this.resizeState !== 0) {
				this.resizeState = 0;
				document.body.style.cursor = '';
				this.emitEvent('resize:end');
			}
		}
	},
	watch: {
		maxWidth(value) {
			this.maxW = value;
		},
		maxHeight(value) {
			this.maxH = value;
		},
		minWidth(value) {
			this.minW = value;
		},
		minHeight(value) {
			this.minH = value;
		},
		width(value) {
			typeof value === 'number' && (this.w = value);
		},
		height(value) {
			typeof value === 'number' && (this.h = value);
		}
	},
	mounted() {
		if (this.active === 'b') {
			typeof this.height !== 'number' && (this.h = this.$el.clientHeight);
		} else {
			typeof this.width !== 'number' && (this.w = this.$el.clientWidth);
		}
		typeof this.height !== 'number' && (this.h = this.$el.clientHeight);
		this.w < this.minW && (this.w = this.minW);
		this.h < this.minH && (this.h = this.minH);
		this.w > this.maxW && (this.w = this.maxW);
		this.h > this.maxH && (this.h = this.maxH);
		document.documentElement.addEventListener('mousemove', this.handleMove, true);
		document.documentElement.addEventListener('mousedown', this.handleDown, true);
		document.documentElement.addEventListener('mouseup', this.handleUp, true);
		this.emitEvent('mount');
	},
	beforeDestroy() {
		document.documentElement.removeEventListener('mousemove', this.handleMove, true);
		document.documentElement.removeEventListener('mousedown', this.handleDown, true);
		document.documentElement.removeEventListener('mouseup', this.handleUp, true);
		this.emitEvent('destroy');
	}
};
</script>
