export default {
	base: 'inline-block text-white uppercase border-l border-white first:border-l-0  first:rounded-l last:rounded-r -mr-px last:mr-0 cursor-pointer',
	normal: {
		default: {
			unchecked: 'bg-gray-600 hover:bg-gray-700 focus:bg-gray-700',
			checked: 'bg-gray-800 hover:bg-gray-800 focus:bg-gray-900'
		},
		primary: {
			unchecked: 'bg-teal-400 hover:bg-teal-500 focus:bg-teal-500',
			checked: 'bg-teal-600 hover:bg-teal-600 focus:bg-teal-700'
		},
		success: {
			unchecked: 'bg-green-600 hover:bg-green-700 focus:bg-green-700',
			checked: 'bg-green-800 hover:bg-green-800 focus:bg-green-900'
		},
		warning: {
			unchecked: 'bg-yellow-600 hover:bg-yellow-700 focus:bg-yellow-700',
			checked: 'bg-yellow-800 hover:bg-yellow-800 focus:bg-yellow-900'
		},
		danger: {
			unchecked: 'bg-red-600 hover:bg-red-700 focus:bg-red-700',
			checked: 'bg-red-800 hover:bg-red-900 focus:bg-red-900'
		},
		info: {
			unchecked: 'bg-blue-500 hover:bg-blue-600 focus:bg-blue-600',
			checked: 'bg-blue-700 hover:bg-blue-800 focus:bg-blue-800'
		}
	},
	disabled: {
		default: {
			unchecked: 'cursor-not-allowed bg-gray-400',
			checked: 'cursor-not-allowed bg-gray-400'
		},
		primary: {
			unchecked: 'cursor-not-allowed bg-teal-300',
			checked: 'cursor-not-allowed bg-teal-300'
		},
		success: {
			unchecked: 'cursor-not-allowed bg-green-300',
			checked: 'cursor-not-allowed bg-green-300'
		},
		warning: {
			unchecked: 'cursor-not-allowed bg-yellow-400',
			checked: 'cursor-not-allowed bg-yellow-400'
		},
		danger: {
			unchecked: 'cursor-not-allowed bg-red-300',
			checked: 'cursor-not-allowed bg-red-300'
		},
		info: {
			unchecked: 'cursor-not-allowed bg-blue-300',
			checked: 'cursor-not-allowed bg-blue-300'
		}
	},
	size: {
		default: 'text-base py-2 px-4',
		sm: 'text-sm py-1 px-3',
		lg: 'text-lg py-3 px-5'
	}
};
