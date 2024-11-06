import { v4 as uuid } from "uuid"
import localization from "./templates.localization"
import { store } from "../../store"

export class TemplatesStorage {
	static getTemplates() {
		const state = store.getState()
		localization.setLanguage(state.localization.language)

		let templates = {
			audio: {
				type: "audio",
				source: "https://www.w3schools.com/html/mov_bbb.mp4",
				position: "left",
			},
			"audio-configurer": {
				type: "audio-configurer",
				source: "https://www.w3schools.com/html/mov_bbb.mp4",
				display: true,
			},
			text: {
				type: "text",
				text: "",
				position: "left",
			},
			heading: {
				type: "heading",
				text: "",
				position: "left",
			},
			title: {
				type: "title",
				text: "",
				position: "left",
			},
			image: {
				type: "image",
				source: "https://jigjoy.io/assets/placeholderimage.jpg",
				position: "left",
				size: "large",
			},
			input: {
				type: "input",
				placeholder: localization.placeholder,
				label: localization.label,
				inputType: "text",
			},
			"input-configurer": {
				placeholder: localization.placeholder,
				label: localization.label,
				type: "input-configurer",
				inputType: "text",
				display: true,
			},
			"image-configurer": {
				type: "image-configurer",
				source: "https://jigjoy.io/assets/placeholderimage.jpg",
				display: true,
			},
			question: {
				type: "question",
				content: {
					displayQuestion: true,
					text: localization.questionText,
					displayImage: true,
					image: "https://jigjoy.io/assets/placeholderimage.jpg",
				},
				answers: [
					{
						id: uuid(),
						correct: false,
						text: localization.answerText1,
					},
					{
						id: uuid(),
						correct: true,
						text: localization.answerText2,
					},
					{
						id: uuid(),
						correct: false,
						text: localization.answerText3,
					},
				],
				outcomes: {
					confirmationButtonText: localization.confirmationButtonText,
					correct: {
						message: localization.correctMessage,
						title: localization.correctTitle,
						type: "success",
					},
					incorrect: {
						message: localization.incorrectMessage,
						title: localization.incorrectTitle,
						type: "danger",
					},
				},
			},
			message: {
				type: "message",
				message: localization.messageText,
				audio: "https://www.w3schools.com/html/mov_bbb.mp4",
				position: "left",
				color: "rose",
			},
			reel: {
				type: "reel",
				source: "https://www.w3schools.com/html/mov_bbb.mp4",
				position: "left",
			},
			"reel-configurer": {
				type: "reel-configurer",
				source: "https://www.w3schools.com/html/mov_bbb.mp4",
				display: true,
			},
			profile: {
				type: "profile",
				firstName: localization.firstName,
				lastName: localization.lastName,
				description: localization.description,
				image: "https://jigjoy.io/assets/profiletileplaceholderimage.jpg",
				username: localization.username,
			},
			"carousel-tile": {
				type: "carousel-tile",
				title: localization.title,
				description: localization.description,
				cta: localization.cta,
			},
			"block-selector": {
				type: "block-selector",
			},
			"carousel-configurer": {
				type: "carousel-configurer",
				accessType: "freebie",
				title: localization.title,
				description: localization.description,
				numberOfPages: 3,
				display: true,
			},
			carousel: {
				type: "carousel",
				name: localization.carousel,
				environment: "development",
				linkedPageId: null,
				config: {
					pages: [],
					buttons: {
						previous: localization.previous,
						next: localization.next,
						home: localization.backToHome,
					},
				},
			},
			"page-configurer": {
				type: "page-configurer",
				accessType: "freebie",
				title: localization.title,
				description: localization.description,
				display: true,
			},
			"page-tile": {
				type: "page-tile",
				title: localization.title,
				description: localization.description,
				cta: localization.cta,
			},
			blank: {
				type: "blank",
				name: localization.blankPage,
				environment: "development",
				linkedPageId: null,
				config: {
					buildingBlocks: [],
				},
			},
		}
		return templates
	}
}
