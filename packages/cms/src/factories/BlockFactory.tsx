import React, { lazy, Suspense } from "react"

const AudioButton = lazy(() => import('../components/audio/AudioButton'))
const Text = lazy(() => import('../components/text/Text'))
const Heading = lazy(() => import('../components/heading/Heading'))
const Title = lazy(() => import('../components/title/Title'))
const Image = lazy(() => import('../components/image/Image'))
const Button = lazy(() => import('../components/button/Button'))
const Question = lazy(() => import('../components/question/Question'))
const ChapterTile = lazy(() => import('../components/ChapterTile'))
const Conversation = lazy(() => import('../components/conversation/Conversation'))
const Reel = lazy(() => import('../components/reel/Reel'))
const Profile = lazy(() => import('../components/profile/Profile'))

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
            component: Question
        },
        "chapter": {
            component: ChapterTile
        },
        "conversation": {
            component: Conversation
        },
        "reel": {
            component: Reel
        },
        "profile": {
            component: Profile
        }
    }
    
    static get(props: any ) {
        let block : any = this.buildingBlocks[props.type]
        return <Suspense><block.component {...props}/></Suspense>
    }
}