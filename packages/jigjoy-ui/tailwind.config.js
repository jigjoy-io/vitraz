/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: "#F672D1",
				"primary-light": "#FBBEEA",
				"jig-default": "#000000",
				"default-light": "#E2E2E2",
				light: "#AAAAAA",
				"alert-success": "#d1f4e0",
				"alert-danger": "#fdd0df",
				"alert-info": "#E6F3FF",
				"jig-brown": "#F2EEF0",
				"jig-green": "#EFFDFB",
				"jig-rose": "#fbbeea33",
				"jig-yellow": "#FEF7EA",
				"jig-blue": "#E5EFFA",
				"jig-red": "#fdd0df",
				"shallow-gray": "#E5E7EB",
				"text-danger": "#ed5249",
				highlight: "#DBEAFE",
				"text-default": "#E2E2E2",
				"dot-color": "#4b5563",
			},
			boxShadow: {
				DEFAULT: "0px 2px 8px rgba(17,17,26,0.1), 0px 4px 12px rgba(17,17,26,0.1), 0px 8px 28px rgba(17,17,26,0.1)",
			},
			backgroundImage: {
				"gradient-custom": "linear-gradient(90deg, #d4e546 0%, #95ed3a 50%, #48ec92 100%)",
				"gradient-custom-opacity": "linear-gradient(90deg, rgba(212, 229, 70, 0.2) 0%, rgba(149, 237, 58, 0.2) 50%, rgba(72, 236, 146, 0.2) 100%)",
			},
			fontSize: {
				title: [
					"2.25rem",
					{
						lineHeight: "2.5rem",
						fontWeight: "700",
					},
				],
				heading: [
					"1.5rem",
					{
						lineHeight: "2rem",
						fontWeight: "700",
					},
				],
				paragraph: [
					"0.875rem",
					{
						lineHeight: "1.25rem",
					},
				],
			},
		},
	},
	plugins: [],
}
