import React, { lazy, Suspense } from "react"

const AudioButton = lazy(() => import("@jigjoy-ui/audio-button"))
const Text = lazy(() => import("@jigjoy-ui/text"))
const Heading = lazy(() => import("@jigjoy-ui/heading"))
const Title = lazy(() => import("@jigjoy-ui/title"))
const Image = lazy(() => import("@jigjoy-ui/image"))
const Button = lazy(() => import("@jigjoy-ui/button"))
const Question = lazy(() => import("@jigjoy-ui/question"))
const CarouselTile = lazy(() => import("@jigjoy-ui/carousel-tile"))
const Message = lazy(() => import("@jigjoy-ui/message"))
const Video = lazy(() => import("@jigjoy-ui/video"))
const Profile = lazy(() => import("@jigjoy-ui/profile"))
const PageTile = lazy(() => import("@jigjoy-ui/page-tile"))
const CarouselSelector = lazy(() => import("../../components/selectors/carousel-selector"))
const PageSelector = lazy(() => import("../../components/selectors/page-selector"))
const ImageSelector = lazy(() => import("../../components/selectors/image-selector"))
const AudioSelector = lazy(() => import("../../components/selectors/audio-selector"))
const VideoSelector = lazy(() => import("../../components/selectors/video-selector"))
const BlockSelector = lazy(() => import("../../components/selectors/block-selector"))

export default class BlockFactory extends React.Component {
	static buildingBlocks: any = {
		audio: {
			component: AudioButton,
		},
		"audio-configurer": {
			component: AudioSelector,
		},
		text: {
			component: Text,
		},
		heading: {
			component: Heading,
		},
		title: {
			component: Title,
		},
		image: {
			component: Image,
		},
		"image-configurer": {
			component: ImageSelector,
		},
		button: {
			component: Button,
		},
		question: {
			component: Question,
		},
		"carousel-tile": {
			component: CarouselTile,
		},
		message: {
			component: Message,
		},
		reel: {
			component: Video,
		},
		"reel-configurer": {
			component: VideoSelector,
		},
		profile: {
			component: Profile,
		},
		"carousel-configurer": {
			component: CarouselSelector,
		},
		"page-tile": {
			component: PageTile,
		},
		"page-configurer": {
			component: PageSelector,
		},
		"block-selector": {
			component: BlockSelector,
		},
	}

	static get(props: any) {
		let block: any = this.buildingBlocks[props.type]
		return (
			<Suspense>
				<block.component {...props} />
			</Suspense>
		)
	}
}
