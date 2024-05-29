import React from "react"
import QuestionAnswers from "./QuestionAnswers"
import QuestionContent from "./QuestionContent"
import './../../index.css'

export default function Question(props: any) {
    
    return <>
        <QuestionContent content={props.content} />
        <QuestionAnswers {...props} />
    </>
}
