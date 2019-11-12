export default {
	label: {
		base: 'uppercase tracking-wide text-xs font-bold mr-4 last:mr-0 inline-flex justify-center items-center',
		state: {
			default: 'text-gray-700',
			disabled: 'text-gray-400',
			success: 'text-green-300',
			error: 'text-red-700'
		}
	},
	radio: {
		base: 'relative w-4 h-4 rounded-full flex flex-shrink-0 justify-center items-center shadow-inner border',
		state: {
			default: 'bg-gray-100 text-gray-700 border-gray-300 focus:border-teal-400',
			disabled: 'bg-gray-200 text-gray-700 border-gray-300',
			success: 'bg-gray-100 text-gray-700 border-green-300 focus:border-green-400',
			error: 'bg-gray-100 text-gray-700 border-red-300 focus:border-red-400'
		}
	},
	text: 'ml-2',
	svg: 'fill-current opacity-0 w-3 h-3 pointer-events-none'
};
