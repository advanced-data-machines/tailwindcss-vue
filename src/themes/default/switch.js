export default {
	base: 'inline-block mr-3 last:mr-0',
	line: {
		base: 'rounded-full shadow-inner',
		normal: {
			unchecked: 'bg-gray-500',
			checked: 'bg-green-400'
		},
		disabled: {
			unchecked: 'bg-gray-200 cursor-not-allowed',
			checked: 'bg-green-200 cursor-not-allowed'
		},
		size: {
			default: 'w-10 h-4',
			sm: 'w-8 h-4',
			lg: 'w-14 h-6'
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
			default: 'w-6 h-6',
			sm: 'w-5 h-5',
			lg: 'w-8 h-8'
		}
	}
};
