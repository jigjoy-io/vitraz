import React from "react"
import QuestionAnswers from "./QuestionAnswers"
import QuestionContent from "./QuestionContent"

export default function Question(props: any) {

    return <>
        <QuestionContent content={props.content} />
        <QuestionAnswers {...props} />
    </>
}
