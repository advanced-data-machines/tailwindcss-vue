export default {
	base: 'whitespace-no-wrap inline-block border first:rounded-l last:rounded-r cursor-pointer align-baseline leading-tight',
	normal: {
		default: {
			unchecked: 'text-white bg-gray-600 hover:bg-gray-700 focus:bg-gray-700 border-gray-600 hover:border-gray-700 focus:border-gray-700',
			checked: 'text-white bg-gray-800 border-gray-800 shadow-inner'
		},
		primary: {
			unchecked: 'text-white bg-teal-400 hover:bg-teal-500 focus:bg-teal-500 border-teal-400 hover:border-teal-500 focus:border-teal-500',
			checked: 'text-white bg-teal-600 border-teal-600 shadow-inner'
		},
		success: {
			unchecked: 'text-white bg-green-600 hover:bg-green-700 focus:bg-green-700 border-green-600 hover:border-green-700 focus:border-green-700',
			checked: 'text-white bg-green-800 border-green-800 shadow-inner'
		},
		warning: {
			unchecked: 'text-white bg-yellow-600 hover:bg-yellow-700 focus:bg-yellow-700 border-yellow-600 hover:border-yellow-700 focus:border-yellow-700',
			checked: 'text-white bg-yellow-800 border-yellow-800 shadow-inner'
		},
		danger: {
			unchecked: 'text-white bg-red-600 hover:bg-red-700 focus:bg-red-700 border-red-600 hover:border-red-700 focus:border-red-700',
			checked: 'text-white bg-red-800 border-red-800 shadow-inner'
		},
		info: {
			unchecked: 'text-white bg-blue-500 hover:bg-blue-600 focus:bg-blue-600 border-blue-500 hover:border-blue-600 focus:border-blue-600',
			checked: 'text-white bg-blue-700 border-blue-700 shadow-inner'
		}
	},
	disabled: {
		default: {
			unchecked: 'cursor-not-allowed bg-gray-400 border-gray-400',
			checked: 'cursor-not-allowed bg-gray-500 border-gray-500'
		},
		primary: {
			unchecked: 'cursor-not-allowed bg-teal-300 border-teal-400',
			checked: 'cursor-not-allowed bg-teal-300 border-teal-400'
		},
		success: {
			unchecked: 'cursor-not-allowed bg-green-300 border-green-300',
			checked: 'cursor-not-allowed bg-green-400 border-green-400'
		},
		warning: {
			unchecked: 'cursor-not-allowed bg-yellow-400 border-yellow-400',
			checked: 'cursor-not-allowed bg-yellow-500 border-yellow-500'
		},
		danger: {
			unchecked: 'cursor-not-allowed bg-red-300 border-red-300',
			checked: 'cursor-not-allowed bg-red-400 border-red-400'
		},
		info: {
			unchecked: 'cursor-not-allowed bg-blue-300 border-blue-300',
			checked: 'cursor-not-allowed bg-blue-400 border-blue-400'
		}
	},
	size: {
		default: 'py-2 px-4',
		sm: 'py-1 px-3',
		lg: 'py-3 px-5'
	}
};
