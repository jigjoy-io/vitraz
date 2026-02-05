import PageIcon from "../../../../icons/page-icon"
import RenameIcon from "../../../../icons/rename-icon"
import ImageIcon from "../../../../icons/image-icon"
import AudioIcon from "../../../../icons/audio-icon"
import QuestionIcon from "../../../../icons/question-icon"
import MessageIcon from "../../../../icons/message-icon"

export class SelectorOptions {
	static getOptions() {
		let options = [
			{
				key: "pages",
				commands: [
					{
						key: "page-configurer",
						label: "Blank Page",
						icon: PageIcon,
					},
				],
			},
			{
				key: "text",
				commands: [
					{
						key: "title",
						label: "Title",
						icon: RenameIcon,
					},
					{
						key: "heading",
						label: "Heading",
						icon: RenameIcon,
					},
					{
						key: "text",
						label: "Text",
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
						label: "Image",
						icon: ImageIcon,
					},
					{
						key: "audio-configurer",
						label: "Audio",
						icon: AudioIcon,
					},
				],
			},
			{
				key: "advanced",
				commands: [
					{
						key: "question",
						label: "Question",
						icon: QuestionIcon,
					},
					{
						key: "message",
						label: "Message",
						icon: MessageIcon,
					},
				],
			},
		]

		return options
	}
}
