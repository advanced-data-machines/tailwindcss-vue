
import { setThemeKey, extendDefaultTheme } from './theme.js';
export const installComponents = function(Vue, args, components) {
	if (!Vue.prototype.$tailwindVue || !Vue.prototype.$tailwindVue.theme) registerComponentProgrammatic(Vue, 'theme', {});
	components.forEach(component => {
		const extend = extendDefaultTheme(args.theme || {}, component.name);
		if (extend == null) {
			return;
		}
		Vue.component(component.name, component);
		setThemeKey(component.name, extend);
		Vue.prototype.$tailwindVue.theme[component.name] = extend;
	});
};

export const registerComponentProgrammatic = (Vue, property, component) => {
	if (!Vue.prototype.$tailwindVue) Vue.prototype.$tailwindVue = {};
	Vue.prototype.$tailwindVue[property] = component;
};
