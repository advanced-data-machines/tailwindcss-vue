import { objectAssign } from '../utils/utils.js';

const theme = {};

export const extendDefaultTheme = function(theme, name, defaultTheme) {
	const themeCustom = theme[name] || {};
	return objectAssign({}, defaultTheme, themeCustom);
};

export const setThemeKey = (key, value) => {
	theme[key] = value;
};

export default theme;
