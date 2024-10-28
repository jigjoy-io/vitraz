import LocalizedStrings from "react-localization"

let localization = new LocalizedStrings({
	US: {
		drafts: "Drafts",
		newProject: "Start New Project",
		options: "Options",
		viewAnalytics: "View Analytics",
		jigJoyTutorial: "JigJoy Tutorial",
		help: "Help",
		share: "Share",
		preveiw: "Preview",
		publish: "Publish",
		publishingInProgress: "Publishing page in progress",
		publishSuccess: "Project published",
		publishSuccessMessage: "Click `Share` to get a link with applied changes",
		publishFailed: "Something went wrong",
		publishFailedMessage: "The page was not published. Please try again later or contact JigJoy support.",
	},
	RS: {
		drafts: "Radne verzije",
		newProject: "Kreiraj novi projekat",
		options: "Ostale opcije",
		viewAnalytics: "Pogledaj analitiku",
		jigJoyTutorial: "JigJoy vodič",
		help: "Pomoć",
		share: "Podeli",
		preveiw: "Tesitraj",
		publish: "Lansiraj 🚀",
		publishingInProgress: "Kreiranje produkcionog linka u toku",
		publishSuccess: "Link uspešno kreiran",
		publishSuccessMessage: "Klikni na 'Preuzmi link' da podeliš aplikaciju",
		publishFailed: "Došlo je do greške",
		publishFailedMessage: "Link nije kreiran. Molim vas probajte opet kasnije ili kontaktirajte JigJoy tim.",
	},
})

export default localization
