export default {
	base: 'appearance-none w-full border rounded focus:outline-none leading-tight',
	state: {
		default: 'bg-gray-100 text-gray-700 border-gray-300 focus:border-teal-400',
		disabled: 'bg-gray-200 text-gray-700 border-gray-300',
		readonly: 'bg-gray-200 text-gray-700 border-gray-300',
		success: 'bg-gray-100 text-gray-700 border-green-300 focus:border-green-400',
		error: 'bg-gray-100 text-gray-700 border-red-300 focus:border-red-400'
	},
	size: {
		default: 'py-2 px-4',
		sm: 'py-1 px-3',
		lg: 'py-3 px-5'
	}
};
