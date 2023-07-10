module.exports = {
	content: [
		'./src/**/*.{js,jsx,ts,tsx}',
		'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
	],
	theme: {
		colors: {},
		fontFamily: {},
		extend: {
			spacing: {},
			borderRadius: {},
		},
	},
	plugins: [require('flowbite/plugin')],
};
