import React from "react"
import EditableText from "../../pages/designer/toolbar/builder/editable-text"
import EditableImage from "../../pages/designer/toolbar/builder/editable-image"
import NoneEditableBlock from "../../pages/designer/toolbar/builder/none-editable-block"
import EditableQuestion from "../../pages/designer/toolbar/builder/editable-question"
import EditableProfile from "../../pages/designer/toolbar/builder/editable-profile"
import EditableReel from "../../pages/designer/toolbar/builder/editable-reel"
import EditableMessage from "../../pages/designer/toolbar/builder/editable-message"
import EditableAudio from "../../pages/designer/toolbar/builder/editable-audio"
import EditableCarouselTile from "../../pages/designer/toolbar/builder/editable-carousel-tile"
import BasicEditableBlock from "../../pages/designer/toolbar/builder/basic-editable-block"
import EditablePageTile from "../../pages/designer/toolbar/builder/editable-page-tile"

export default class EditorFactory extends React.Component {
	static builders: any = {
		text: {
			builder: new EditableText(),
		},
		heading: {
			builder: new EditableText(),
		},
		title: {
			builder: new EditableText(),
		},
		image: {
			builder: new EditableImage(),
		},
		"image-configurer": {
			builder: new BasicEditableBlock(),
		},
		button: {
			builder: new NoneEditableBlock(),
		},
		question: {
			builder: new EditableQuestion(),
		},
		profile: {
			builder: new EditableProfile(),
		},
		reel: {
			builder: new EditableReel(),
		},
		"reel-configurer": {
			builder: new BasicEditableBlock(),
		},
		message: {
			builder: new EditableMessage(),
		},
		audio: {
			builder: new EditableAudio(),
		},
		"audio-configurer": {
			builder: new BasicEditableBlock(),
		},
		"carousel-tile": {
			builder: new EditableCarouselTile(),
		},
		cta: {
			builder: new NoneEditableBlock(),
		},
		"carousel-configurer": {
			builder: new BasicEditableBlock(),
		},
		"page-configurer": {
			builder: new BasicEditableBlock(),
		},
		"page-tile": {
			builder: new EditablePageTile(),
		},
		"block-selector": {
			builder: new BasicEditableBlock(),
		},
	}

	static getEditableBlock(props: any) {
		let builder = this.builders[props.type].builder
		return builder.get(props)
	}
}
