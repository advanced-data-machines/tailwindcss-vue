import DefaultTheme from '../themes/default/index.js';
import { objectAssign } from '../utils/utils.js';

let theme = objectAssign({}, DefaultTheme);

export const extendDefaultTheme = function(theme, name) {
	const themeCustom = theme[name] || {};
	const themeDefault = DefaultTheme[name];
	return objectAssign({}, themeDefault, themeCustom);
};

export const setThemeKey = (key, value) => {
	theme[key] = value;
};

export default theme;
