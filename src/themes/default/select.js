export default {
	wrapper: 'relative',
	base: 'appearance-none w-full border rounded focus:outline-none leading-tight',
	state: {
		default: 'bg-gray-100 text-gray-700 border-gray-300 focus:border-teal-400',
		disabled: 'bg-gray-200 text-gray-700 border-gray-300',
		readonly: 'bg-gray-200 text-gray-700 border-gray-300',
		success: 'bg-gray-100 text-gray-700 border-green-300 focus:border-green-400',
		error: 'bg-gray-100 text-gray-700 border-red-300 focus:border-red-400'
	},
	size: {
		default: 'py-2 pl-4 pr-11',
		sm: 'py-1 pl-3 pr-10',
		lg: 'py-3 pl-5 pr-12'
	},
	arrow: {
		base: 'text-gray-700',
		size: {
			default: 'h-5 w-5',
			sm: 'h-4 w-4',
			lg: 'h-6 w-6'
		}
	}
};
