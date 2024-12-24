import AudioButtonDocumentation from "./documentations/audio-button-documentation"
import ButtonDocumentation from "./documentations/button-documentation"
import HeadingDocumentation from "./documentations/heading-documentation"
import TitleDocumentation from "./documentations/title-documentation"

export type Documentation = {
	id: string
	name: string
	component: any
}
const docs: Documentation[] = [
	{
		id: "title",
		name: "Title",
		component: TitleDocumentation,
	},
	{
		id: "heading",
		name: "Heading",
		component: HeadingDocumentation,
	},
	{
		id: "text",
		name: "Text",
		component: TitleDocumentation,
	},
	{
		id: "button",
		name: "Button",
		component: ButtonDocumentation,
	},
	{
		id: "audio",
		name: "Audio Button",
		component: AudioButtonDocumentation,
	},
]

export default docs
