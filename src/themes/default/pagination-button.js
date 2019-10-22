export default {
	base: 'appearance-none whitespace-no-wrap inline-block rounded text-center shadow focus:outline-none border align-baseline leading-tight mr-2 last:mr-0',
	normal: {
		default: {
			solid: 'text-white bg-gray-600 hover:bg-gray-700 focus:bg-gray-700 border-gray-600 hover:border-gray-700 focus:border-gray-700',
			outline: 'text-gray-600 hover:text-gray-700 focus:text-gray-700 border-gray-600 hover:border-gray-700 focus:border-gray-700'
		},
		primary: {
			solid: 'text-white bg-teal-400 hover:bg-teal-500 focus:bg-teal-500 border-teal-400 hover:border-teal-500 focus:border-teal-500',
			outline: 'text-teal-400 hover:text-teal-600 focus:text-teal-600 border-teal-400 hover:border-teal-600 focus:border-teal-600'
		},
		success: {
			solid: 'text-white bg-green-600 hover:bg-green-700 focus:bg-green-700 border-green-600 hover:border-green-700 focus:border-green-700',
			outline: 'text-green-600 hover:text-green-800 focus:text-green-800 border-green-600 hover:border-green-800 focus:border-green-800'
		},
		warning: {
			solid: 'text-white bg-yellow-600 hover:bg-yellow-700 focus:bg-yellow-700 border-yellow-600 hover:border-yellow-700 focus:border-yellow-700',
			outline: 'text-yellow-600 hover:text-yellow-800 focus:text-yellow-800 border-yellow-600 hover:border-yellow-800 focus:border-yellow-800'
		},
		danger: {
			solid: 'text-white bg-red-700 hover:bg-red-800 focus:bg-red-800 border-red-700 hover:border-red-800 focus:border-red-800',
			outline: 'text-red-600 hover:text-red-800 focus:text-red-800 border-red-600 hover:border-red-800 focus:border-red-800'
		},
		info: {
			solid: 'text-white bg-blue-500 hover:bg-blue-600 focus:bg-blue-600 border-blue-500 hover:border-blue-600 focus:border-blue-600',
			outline: 'text-blue-500 hover:text-blue-700 focus:text-blue-700 border-blue-500 hover:border-blue-700 focus:border-blue-700'
		}
	},
	disabled: {
		default: {
			solid: 'cursor-not-allowed text-white bg-gray-400 border-gray-400',
			outline: 'cursor-not-allowed text-gray-400 border-gray-400'
		},
		primary: {
			solid: 'cursor-not-allowed text-white bg-teal-300 border-teal-300',
			outline: 'cursor-not-allowed text-teal-300 border-teal-300'
		},
		success: {
			solid: 'cursor-not-allowed text-white bg-green-300 border-green-300',
			outline: 'cursor-not-allowed text-green-300 border-green-300'
		},
		warning: {
			solid: 'cursor-not-allowed text-white bg-yellow-400 border-yellow-400',
			outline: 'cursor-not-allowed text-yellow-400 border-yellow-400'
		},
		danger: {
			solid: 'cursor-not-allowed text-white bg-red-300 border-red-300',
			outline: 'cursor-not-allowed text-red-300 border-red-300'
		},
		info: {
			solid: 'cursor-not-allowed text-white bg-blue-300 border-blue-300',
			outline: 'cursor-not-allowed text-blue-300 border-blue-300'
		}
	},
	size: {
		normal: {
			default: 'py-2 px-4',
			sm: 'py-1 px-3',
			lg: 'py-3 px-5'
		},
		square: {
			default: 'p-2',
			sm: 'p-1',
			lg: 'p-3'
		}
	},
	rounded: 'rounded-full'
};
