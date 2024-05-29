import React from "react"
import { useState } from "react"
import Alert from "../alert/Alert"
import Button from "../button/Button"
import Item from "../item/Item"

function QuestionAnswers(props: any) {

    const [selected, setSelected] = useState(null)
    const [alert, setAlert] = useState({})
    const [answered, setAnswered] = useState(false)

    const selectAnswer = (outcome: any) => {
        setAnswered(false)
        setSelected(outcome.id)
    }

    const checkAnswer = () => {

        if (selected == props.correctAnswerId) {
            setAlert(props.correct)
            setAnswered(true)
        } else {
            setAlert(props.incorrect)
            setAnswered(true)
        }


    }

    return (

        <div className='flex flex-col gap-3 mt-3'>

            {props.answers.map((answer: any) => <Item borderOn={true} {...answer} answered={answered} selected={selected} action={selectAnswer} />)}

            {answered && <Alert  {...alert} />}

            {!answered && <Button text="Check the answer" key={selected} width="full" color={selected!=null ? "secondary": "default"} action={checkAnswer} disabled={selected==null}/>}

        </div>
    )

}

export default QuestionAnswers

