import React, { lazy, Suspense } from "react"
import AudioButton from "../components/audio/AudioButton"
import Text from "../components/text/Text"
import Heading from "../components/heading/Heading"
import Title from "../components/title/Title"
import Image from "../components/image/Image"
import Button from "../components/button/Button"
import Question from "../components/question/Question"
import Chapter from "../components/chapter/Chapter"
import Conversation from "../components/conversation/Conversation"
import Reel from "../components/reel/Reel"
import Profile from "../components/profile/Profile"

// const AudioButton = lazy(() => import('../components/audio/AudioButton'))
// const Text = lazy(() => import('../components/text/Text'))
// const Heading = lazy(() => import('../components/heading/Heading'))
// const Title = lazy(() => import('../components/title/Title'))
// const Image = lazy(() => import('../components/image/Image'))
// const Button = lazy(() => import('../components/button/Button'))
// const Question = lazy(() => import('../components/question/Question'))
// const Chapter = lazy(() => import('../components/chapter/Chapter'))

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
            component: Chapter
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