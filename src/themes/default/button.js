export default {
	base: 'rounded shadow focus:outline-none uppercase border',
	normal: {
		default: {
			solid: 'text-white bg-gray-600 hover:bg-gray-700 focus:bg-gray-700 border-gray-600 hover:border-gray-700 focus:border-gray-700',
			outline: 'text-gray-600 hover:text-gray-700 focus:text-gray-700 border-gray-600 hover:border-gray-700 focus:border-gray-700'
		},
		primary: {
			solid: 'text-white bg-primary-400 hover:bg-primary-500 focus:bg-primary-500 border-primary-400 hover:border-primary-500 focus:border-primary-500',
			outline: 'text-primary-400 hover:text-primary-600 focus:text-primary-600 border-primary-400 hover:border-primary-600 focus:border-primary-600'
		},
		success: {
			solid: 'text-white bg-success-600 hover:bg-success-700 focus:bg-success-700 border-success-600 hover:border-success-700 focus:border-success-700',
			outline: 'text-success-600 hover:text-success-800 focus:text-success-800 border-success-600 hover:border-success-800 focus:border-success-800'
		},
		warning: {
			solid: 'text-white bg-warning-600 hover:bg-warning-700 focus:bg-warning-700 border-warning-600 hover:border-warning-700 focus:border-warning-700',
			outline: 'text-warning-600 hover:text-warning-800 focus:text-warning-800 border-warning-600 hover:border-warning-800 focus:border-warning-800'
		},
		danger: {
			solid: 'text-white bg-danger-700 hover:bg-danger-800 focus:bg-danger-800 border-danger-700 hover:border-danger-800 focus:border-danger-800',
			outline: 'text-danger-600 hover:text-danger-800 focus:text-danger-800 border-danger-600 hover:border-danger-800 focus:border-danger-800'
		},
		info: {
			solid: 'text-white bg-info-500 hover:bg-info-600 focus:bg-info-600 border-info-500 hover:border-info-600 focus:border-info-600',
			outline: 'text-info-500 hover:text-info-700 focus:text-info-700 border-info-500 hover:border-info-700 focus:border-info-700'
		}
	},
	disabled: {
		default: {
			solid: 'cursor-not-allowed text-white bg-gray-400 border-gray-400',
			outline: 'cursor-not-allowed text-gray-400 border-gray-400'
		},
		primary: {
			solid: 'cursor-not-allowed text-white bg-primary-300 border-primary-300',
			outline: 'cursor-not-allowed text-primary-300 border-primary-300'
		},
		success: {
			solid: 'cursor-not-allowed text-white bg-success-300 border-success-300',
			outline: 'cursor-not-allowed text-success-300 border-success-300'
		},
		warning: {
			solid: 'cursor-not-allowed text-white bg-warning-400 border-warning-400',
			outline: 'cursor-not-allowed text-warning-400 border-warning-400'
		},
		danger: {
			solid: 'cursor-not-allowed text-white bg-danger-300 border-danger-300',
			outline: 'cursor-not-allowed text-danger-300 border-danger-300'
		},
		info: {
			solid: 'cursor-not-allowed text-white bg-info-300 border-info-300',
			outline: 'cursor-not-allowed text-info-300 border-info-300'
		}
	},
	size: {
		default: 'text-base py-1 px-3',
		sm: 'text-xs py-1 px-2',
		lg: 'text-base py-2 px-4'
	},
	rounded: 'rounded-full'
};
