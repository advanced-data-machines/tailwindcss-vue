export default {
	wrapper: 'relative inline-flex',
	base: 'z-30 absolute min-w-48',
	content: 'rounded bg-white shadow border border-gray-300 overflow-hidden',
	state: {
		default: 'block',
		hoverable: 'hidden'
	},
	position: {
		bottomLeft: 'top-full left-0 pt-1',
		bottomRight: 'top-full left-auto right-0 pt-1',
		topLeft: 'bottom-full left-0 pb-1',
		topRight: 'bottom-full left-auto right-0 pb-1'
	}
};
