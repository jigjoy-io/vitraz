import localization from "./selector-options.localization"
import ProfileIcon from "../../../../icons/profile-icon"
import PageIcon from "../../../../icons/page-icon"
import CarouselIcon from "../../../../icons/carousel-icon"
import RenameIcon from "../../../../icons/rename-icon"
import ImageIcon from "../../../../icons/image-icon"
import VideoIcon from "../../../../icons/video-icon"
import AudioIcon from "../../../../icons/audio-icon"
import QuestionIcon from "../../../../icons/question-icon"
import MessageIcon from "../../../../icons/message-icon"

export class SelectorOptions {
	static getOptions(language) {
		localization.setLanguage(language)

		let options = [
			{
				key: "profile",
				commands: [
					{
						key: "profile",
						label: localization.profile,
						description: localization.profileDescription,
						icon: ProfileIcon,
					},
				],
			},

			{
				key: "pages",
				commands: [
					{
						key: "page-configurer",
						label: localization.blankPage,
						description: localization.blankPageDescription,
						icon: PageIcon,
					},
					{
						key: "carousel-configurer",
						label: localization.carousel,
						description: localization.carouselDescription,
						icon: CarouselIcon,
					},
				],
			},
			{
				key: "text",
				commands: [
					{
						key: "title",
						label: localization.title,
						description: localization.titleDescription,
						icon: RenameIcon,
					},
					{
						key: "heading",
						label: localization.heading,
						description: localization.headingDescription,
						icon: RenameIcon,
					},
					{
						key: "text",
						label: localization.text,
						description: localization.textDescription,
						icon: RenameIcon,
					},
				],
			},
			{
				title: "Multimedia",
				key: "multimedia",
				commands: [
					{
						key: "image-configurer",
						label: localization.image,
						description: localization.imageDescription,
						icon: ImageIcon,
					},
					{
						key: "reel-configurer",
						label: localization.video,
						description: localization.videoDescription,
						icon: VideoIcon,
					},
					{
						key: "audio-configurer",
						label: localization.audio,
						description: localization.audioDescription,
						icon: AudioIcon,
					},
				],
			},
			{
				key: "advanced",
				commands: [
					{
						key: "question",
						label: localization.question,
						description: localization.questionDescription,
						icon: QuestionIcon,
					},
					{
						key: "message",
						label: localization.message,
						description: localization.messageDescription,
						icon: MessageIcon,
					},
				],
			},
		]

		return options
	}
}
