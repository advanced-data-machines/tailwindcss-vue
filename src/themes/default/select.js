export default {
	base: 'appearance-none block w-full border rounded leading-tight focus:outline-none',
	state: {
		default: 'bg-gray-100 text-gray-700 border-gray-300 focus:border-teal-400',
		disabled: 'bg-gray-200 text-gray-700 border-gray-300',
		readonly: 'bg-gray-200 text-gray-700 border-gray-300',
		success: 'bg-green-100 text-gray-700 border-green-300 focus:border-green-400',
		error: 'bg-red-100 text-gray-700 border-red-300 focus:border-red-400'
	},
	size: {
		default: 'text-base py-3 px-4',
		sm: 'text-sm py-2 px-3',
		lg: 'text-lg py-4 px-4'
	},
	arrowSpace: {
		default: 'pr-11',
		sm: 'pr-10',
		lg: 'pr-12'
	}
};
