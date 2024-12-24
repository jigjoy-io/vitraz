import ImageIcon from "@jigjoy-ui/icons/image-icon"
import VideoIcon from "@jigjoy-ui/icons/video-icon"
import AudioIcon from "@jigjoy-ui/icons/audio-icon"
import ProfileIcon from "@jigjoy-ui/icons/profile-icon"
import PageIcon from "@jigjoy-ui/icons/page-icon"
import CarouselIcon from "@jigjoy-ui/icons/carousel-icon"
import RenameIcon from "@jigjoy-ui/icons/rename-icon"
import MessageIcon from "@jigjoy-ui/icons/message-icon"
import QuestionIcon from "@jigjoy-ui/icons/question-icon"

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
