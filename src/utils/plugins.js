
import { setThemeKey, extendDefaultTheme } from './theme.js';
export const installComponents = function(Vue, args, components) {
	// const current = currentTheme(args);
	if (Vue.prototype.$tvTheme === undefined) Vue.prototype.$tvTheme = {};
	components.forEach(component => {
		const extend = extendDefaultTheme(args.theme || {}, component.name);
		if (extend == null) {
			return;
		}
		Vue.component(component.name, component);
		setThemeKey(component.name, extend);
		Vue.prototype.$tvTheme[component.name] = extend;
	});
};
