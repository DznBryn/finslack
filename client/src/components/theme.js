const { createMuiTheme } = require('@material-ui/core/styles');

const theme = createMuiTheme({
	palette: {
		primary: {
			light: '#33ab9f',
			main: '#009688',
			dark: '#00695f',
		},
		secondary: {
			light: '#ab003c',
			main: '#f50057',
			dark: '#f73378',
		},
		default: {
			light: '#f5f5f5',
			main: '#bdbdbd',
			dark: '#616161'
		},
	},
});

export default theme;
