export default {
	wrapper: {
		base: 'inset-0 justify-center items-center overflow-hidden',
		state: {
			default: 'absolute',
			fullPage: 'z-40 fixed'
		},
		visibility: {
			default: 'hidden',
			active: 'flex'
		}
	},
	spinner: 'after:border-gray-400',
	backdrop: 'absolute inset-0 bg-gray-200 opacity-75'
};
