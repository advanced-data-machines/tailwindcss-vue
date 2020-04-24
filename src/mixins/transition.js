export default {
	props: {
		transition: {
			type: String,
			default: null
		},
		enterClass: {
			type: String,
			default: 'opacity-0'
		},
		enterActiveClass: {
			type: String,
			default: 'ease-out duration-300'
		},
		enterToClass: {
			type: String,
			default: 'opacity-100'
		},
		leaveClass: {
			type: String,
			default: 'opacity-100'
		},
		leaveActiveClass: {
			type: String,
			default: 'ease-out duration-300'
		},
		leaveToClass: {
			type: String,
			default: 'opacity-0'
		}
	}
};
