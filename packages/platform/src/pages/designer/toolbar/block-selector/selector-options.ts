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
	static getOptions() {
		let options = [
			{
				key: "profile",
				commands: [
					{
						key: "profile",
						label: "Profile",
						description: "Showcase personal information and expertise.",
						icon: ProfileIcon,
					},
				],
			},
			{
				key: "pages",
				commands: [
					{
						key: "page-configurer",
						label: "Blank Page",
						description: "Create a sub-page inside this page",
						icon: PageIcon,
					},
					{
						key: "carousel-configurer",
						label: "Carousel",
						description: "Split content into multiple connected pages.",
						icon: CarouselIcon,
					},
				],
			},
			{
				key: "text",
				commands: [
					{
						key: "title",
						label: "Title",
						description: "Create a bold section heading",
						icon: RenameIcon,
					},
					{
						key: "heading",
						label: "Heading",
						description: "Create a medium section heading",
						icon: RenameIcon,
					},
					{
						key: "text",
						label: "Text",
						description: "Begin writing with plain text",
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
						description: "Upload an image or insert its link.",
						icon: ImageIcon,
					},
					{
						key: "reel-configurer",
						label: "Reel",
						description: "Upload an video or insert its link.",
						icon: VideoIcon,
					},
					{
						key: "audio-configurer",
						label: "Audio",
						description: "Upload audio or insert its link.",
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
						description: "Test user's knowledge by asking question.",
						icon: QuestionIcon,
					},
					{
						key: "message",
						label: "Message",
						description: "Display message bubble.",
						icon: MessageIcon,
					},
				],
			},
		]

		return options
	}
}
