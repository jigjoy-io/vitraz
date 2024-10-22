import React from "react"
import { useState } from "react"
import Alert from "../alert/alert"
import Button from "../button/button"
import Item from "../item/item"

function QuestionAnswers(props: any) {

    const [selected, setSelected] = useState({} as any)
    const [alert, setAlert] = useState({})
    const [answered, setAnswered] = useState(false)

    const selectAnswer = (outcome: any) => {
        setAnswered(false)
        setSelected(outcome)
    }

    const checkAnswer = () => {

        if (selected.correct) {
            setAlert(props.outcomes.correct)
            setAnswered(true)
        } else {
            setAlert(props.outcomes.incorrect)
            setAnswered(true)
        }


    }

    return (

        <div className='flex flex-col gap-3 mt-3'>

            {props.answers.map((answer: any) => <Item tabFocus={false} borderOn={true} {...answer} answered={answered} selected={selected.id} action={selectAnswer} />)}

            {answered && <Alert  {...alert} />}

            {!answered && <Button text={props.outcomes.confirmationButtonText} key={selected.id} width="w-full" color={selected != null ? "secondary" : "default"} action={checkAnswer} disabled={selected.id == null} />}

        </div>
    )

}

export default QuestionAnswers

