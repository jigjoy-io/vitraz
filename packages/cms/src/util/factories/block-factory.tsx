import React, { lazy, Suspense } from "react"

const AudioButton = lazy(() => import('../../components/audio/audio-button'))
const Text = lazy(() => import('../../components/text/text'))
const Heading = lazy(() => import('../../components/heading/heading'))
const Title = lazy(() => import('../../components/title/title'))
const Image = lazy(() => import('../../components/image/image'))
const Button = lazy(() => import('../../components/button/button'))
const Question = lazy(() => import('../../components/question/question'))
const CarouselTile = lazy(() => import('../../components/carousel/carousel-tile'))
const Message = lazy(() => import('../../components/message/message'))
const Reel = lazy(() => import('../../components/reel/reel'))
const Profile = lazy(() => import('../../components/profile/profile'))
const CarouselConfigurer = lazy(() => import('../../components/carousel/carousel-configurer'))
const PageTile = lazy(() => import('../../components/page/page-tile'))
const PageConfigurer = lazy(() => import('../../components/page/page-configurer'))
const BlockSelector = lazy(() => import('../../pages/designer/toolbar/block-selector/block-selector'))

export default class BlockFactory extends React.Component {

    static buildingBlocks: any = {
        "audio": {
            component: AudioButton
        },
        "text": {
            component: Text
        },
        "heading": {
            component: Heading
        },
        "title": {
            component: Title
        },
        "image": {
            component: Image
        },
        "button": {
            component: Button
        },
        "question": {
            component: Question,
        },
        "carousel-tile": {
            component: CarouselTile
        },
        "message": {
            component: Message
        },
        "reel": {
            component: Reel
        },
        "profile": {
            component: Profile
        },
        "carousel-configurer": {
            component: CarouselConfigurer
        },
        "page-tile": {
            component: PageTile
        },
        "page-configurer": {
            component: PageConfigurer
        },
        "block-selector": {
            component: BlockSelector
        }
    }

    static get(props: any) {
        let block: any = this.buildingBlocks[props.type]
        return <Suspense><block.component {...props} /></Suspense>
    }
}