module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				primary: '#000000', // Black
				secondary: '#FFFFFF', // White
				accent: '#FF4500', // OrangeRed - High energy orange
				'accent-hover': '#e03e00',
				surface: '#f9fafb', // Very light gray for backgrounds
				'surface-dark': '#111111' // Dark surface for dark mode sections
			},
			fontFamily: {
				sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif']
			}
		}
	},
	plugins: [require('@tailwindcss/typography')]
};
