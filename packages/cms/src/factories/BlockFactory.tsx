import React, { lazy, Suspense } from "react"

const AudioButton = lazy(() => import('../components/audio/AudioButton'))
const Text = lazy(() => import('../components/text/Text'))
const Heading = lazy(() => import('../components/heading/Heading'))
const Title = lazy(() => import('../components/title/Title'))
const Image = lazy(() => import('../components/image/Image'))
const Button = lazy(() => import('../components/button/Button'))
const Question = lazy(() => import('../components/question/Question'))
const CarouselTile = lazy(() => import('../components/carousel/CarouselTile'))
const Message = lazy(() => import('../components/message/Message'))
const Reel = lazy(() => import('../components/reel/Reel'))
const Profile = lazy(() => import('../components/profile/Profile'))
const Cta = lazy(() => import('../components/cta/Cta'))
const BlockSelector = lazy(() => import('../components/toolbar/BlockSelector'))
const CarouselConfigurer = lazy(() => import('../components/toolbar/CarouselConfigurer'))

export default class BlockFactory extends React.Component {

    static buildingBlocks : any = {
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
        "cta": {
            component: Cta
        },
        "carousel-configurer": {
            component: CarouselConfigurer
        },
        "block-selector": {
            component: BlockSelector
        }
    }
    
    static get(props: any ) {
        let block : any = this.buildingBlocks[props.type]
        return <Suspense><block.component {...props}/></Suspense>
    }
}