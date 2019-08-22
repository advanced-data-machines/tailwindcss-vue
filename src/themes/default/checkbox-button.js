export default {
	base: 'inline-block text-white uppercase border-l border-white first:border-l-0  first:rounded-l last:rounded-r -mr-px last:mr-0 cursor-pointer',
	normal: {
		default: {
			unchecked: 'bg-gray-600 hover:bg-gray-700 focus:bg-gray-700',
			checked: 'bg-gray-800 hover:bg-gray-800 focus:bg-gray-900'
		},
		primary: {
			unchecked: 'bg-primary-400 hover:bg-primary-500 focus:bg-primary-500',
			checked: 'bg-primary-600 hover:bg-primary-600 focus:bg-primary-700'
		},
		success: {
			unchecked: 'bg-success-600 hover:bg-success-700 focus:bg-success-700',
			checked: 'bg-success-800 hover:bg-success-800 focus:bg-success-900'
		},
		warning: {
			unchecked: 'bg-warning-600 hover:bg-warning-700 focus:bg-warning-700',
			checked: 'bg-warning-800 hover:bg-warning-800 focus:bg-warning-900'
		},
		danger: {
			unchecked: 'bg-danger-600 hover:bg-danger-700 focus:bg-danger-700',
			checked: 'bg-danger-800 hover:bg-danger-900 focus:bg-danger-900'
		},
		info: {
			unchecked: 'bg-info-500 hover:bg-info-600 focus:bg-info-600',
			checked: 'bg-info-700 hover:bg-info-800 focus:bg-info-800'
		}
	},
	disabled: {
		default: {
			unchecked: 'cursor-not-allowed bg-gray-400',
			checked: 'cursor-not-allowed bg-gray-400'
		},
		primary: {
			unchecked: 'cursor-not-allowed bg-primary-300',
			checked: 'cursor-not-allowed bg-primary-300'
		},
		success: {
			unchecked: 'cursor-not-allowed bg-success-300',
			checked: 'cursor-not-allowed bg-success-300'
		},
		warning: {
			unchecked: 'cursor-not-allowed bg-warning-400',
			checked: 'cursor-not-allowed bg-warning-400'
		},
		danger: {
			unchecked: 'cursor-not-allowed bg-danger-300',
			checked: 'cursor-not-allowed bg-danger-300'
		},
		info: {
			unchecked: 'cursor-not-allowed bg-info-300',
			checked: 'cursor-not-allowed bg-info-300'
		}
	},
	size: {
		default: 'text-base py-2 px-4',
		sm: 'text-sm py-1 px-3',
		lg: 'text-lg py-3 px-5'
	}
};
