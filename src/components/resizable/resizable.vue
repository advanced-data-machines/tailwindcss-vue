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
			newWidth: this.width,
			newHeight: this.height,
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
				width: typeof this.newWidth === 'number' ? this.newWidth + 'px' : this.newWidth,
				height: typeof this.newHeight === 'number' ? this.newHeight + 'px' : this.newHeight
			};
		}
	},
	methods: {
		emitEvent(eventName) {
			this.$emit(eventName, { eventName, width: this.newWidth, height: this.newHeight });
		},
		handleMove(event) {
			if (this.resizeState !== 0) {
				let diffX = event.clientX - this.mouseX + this.offsetX;
				let diffY = event.clientY - this.mouseY + this.offsetY;
				this.offsetX = this.offsetY = 0;
				if (this.resizeState & ELEMENT_MASK['resizable-r'].bit) {
					if (this.newWidth + diffX < this.minW) {
						this.offsetX = (diffX - (diffX = this.minW - this.newWidth));
					} else if (this.maxW && this.newWidth + diffX > this.maxW && (!this.fitParent || this.newWidth < this.parent.width)) {
						this.offsetX = (diffX - (diffX = this.maxW - this.newWidth));
					} else if (this.fitParent && this.newWidth + diffX > this.parent.width) {
						this.offsetX = (diffX - (diffX = this.parent.width - this.newWidth));
					}
					this.newWidth += diffX;
				}
				if (this.resizeState & ELEMENT_MASK['resizable-b'].bit) {
					if (this.newHeight + diffY < this.minH) {
						this.offsetY = (diffY - (diffY = this.minH - this.newHeight));
					} else if (this.maxH && this.newHeight + diffY > this.maxH && (!this.fitParent || this.newHeight < this.parent.height)) {
						this.offsetY = (diffY - (diffY = this.maxH - this.newHeight));
					} else if (this.fitParent && this.newHeight + diffY > this.parent.height) {
						this.offsetY = (diffY - (diffY = this.parent.height - this.newHeight));
					}
					this.newHeight += diffY;
				}
				if (this.resizeState & ELEMENT_MASK['resizable-l'].bit) {
					if (this.newWidth - diffX < this.minW) {
						this.offsetX = (diffX - (diffX = this.newWidth - this.minW));
					} else if (this.maxW && this.newWidth - diffX > this.maxW && this.l > 0) {
						this.offsetX = (diffX - (diffX = this.newWidth - this.maxW));
					} else if (this.fitParent && diffX < 0) {
						this.offsetX = (diffX - (diffX = -this.l));
					}
					this.newWidth -= diffX;
				}

				this.mouseX = event.clientX;
				this.mouseY = event.clientY;
				this.emitEvent('resize-move');
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
					this.emitEvent('resize-start');
					break;
				}
			}
		},
		handleUp() {
			if (this.resizeState !== 0) {
				this.resizeState = 0;
				document.body.style.cursor = '';
				this.emitEvent('resize-end');
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
			typeof value === 'number' && (this.newWidth = value);
		},
		height(value) {
			typeof value === 'number' && (this.newHeight = value);
		}
	},
	mounted() {
		if (this.active === 'b') {
			typeof this.height !== 'number' && (this.newHeight = this.$el.clientHeight);
		} else {
			typeof this.width !== 'number' && (this.newWidth = this.$el.clientWidth);
		}
		typeof this.height !== 'number' && (this.newHeight = this.$el.clientHeight);
		this.newWidth < this.minW && (this.newWidth = this.minW);
		this.newHeight < this.minH && (this.newHeight = this.minH);
		this.newWidth > this.maxW && (this.newWidth = this.maxW);
		this.newHeight > this.maxH && (this.newHeight = this.maxH);
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
