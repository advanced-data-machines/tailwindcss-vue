export default {
	base: 'inline-block mb-3 mr-3 last:mr-0',
	line: {
		base: 'rounded-full shadow-inner',
		normal: {
			unchecked: 'bg-gray-400',
			checked: 'bg-success-400'
		},
		disabled: {
			unchecked: 'bg-gray-200 cursor-not-allowed',
			checked: 'bg-success-200 cursor-not-allowed'
		},
		size: {
			default: 'w-14 h-6',
			sm: 'w-10 h-4',
			lg: 'w-18 h-8'
		}
	},
	dot: {
		base: 'absolute rounded-full shadow bg-white',
		normal: {
			unchecked: '',
			checked: ''
		},
		disabled: {
			unchecked: 'cursor-not-allowed',
			checked: 'cursor-not-allowed'
		},
		size: {
			default: 'w-8 h-8',
			sm: 'w-6 h-6',
			lg: 'w-10 h-10'
		}
	}
};
