export default {
	line: {
		base: 'w-full rounded-full shadow-inner bg-gray-200 overflow-hidden relative',
		bar: {
			base: 'text-center rounded-full absolute top-0 left-0 h-full flex items-center',
			variant: {
				default: 'text-white bg-gray-600',
				primary: 'text-white bg-teal-400',
				success: 'text-white bg-green-600',
				warning: 'text-white bg-yellow-600',
				danger: 'text-white bg-red-700',
				info: 'text-white bg-blue-500'
			}
		},
		size: {
			default: 'text-xs h-4',
			sm: 'text-xxs h-3',
			lg: 'h-5'
		}
	},
	svg: {
		base: 'inline-block',
		path: 'stroke-gray-200',
		bar: {
			base: '',
			variant: {
				default: 'stroke-gray-600',
				primary: 'stroke-teal-400',
				success: 'stroke-green-600',
				warning: 'stroke-yellow-600',
				danger: 'stroke-red-700',
				info: 'stroke-blue-500'
			}
		},
		text: {
			base: 'absolute inset-0 flex items-center justify-center',
			variant: {
				default: 'text-gray-600',
				primary: 'text-teal-400',
				success: 'text-green-600',
				warning: 'text-yellow-600',
				danger: 'text-red-700',
				info: 'text-blue-500'
			}
		}
	}
};
