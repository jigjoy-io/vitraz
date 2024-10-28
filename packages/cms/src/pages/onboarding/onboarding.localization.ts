import LocalizedStrings from "react-localization"

const localization = new LocalizedStrings({
	US: {
		chooseProject: "Choose project to start.",
		blankPageHeading: "Blank Page",
		blankPageDescription: "Create an app from scratch.",
		carouselHeading: "Carousel",
		carouselDescription: "Create a quiz or micro-lesson.",
		loadingMessage: "Project initialization in progress",
	},
	RS: {
		chooseProject: "Odaberi tip projekta.",
		blankPageHeading: "Prazna stranica",
		blankPageDescription: "Kreiraj aplikaciju od početka.",
		carouselHeading: "Karusel",
		carouselDescription: "Kreiraj mikro-lekciju ili kviz.",
		loadingMessage: "Priprema projekta u toku",
	},
})

export default localization
