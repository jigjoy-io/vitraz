import React from "react"
import { useState } from "react"
import Alert from "../alert/Alert"
import Button from "../button/Button"
import Item from "../item/Item"

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
            setAlert(props.correct)
            setAnswered(true)
        } else {
            setAlert(props.incorrect)
            setAnswered(true)
        }


    }

    return (

        <div className='flex flex-col gap-3 mt-3'>

            {props.answers.map((answer: any) => <Item borderOn={true} {...answer} answered={answered} selected={selected.id} action={selectAnswer} />)}

            {answered && <Alert  {...alert} />}

            {!answered && <Button text="Check the answer" key={selected.id} width="full" color={selected!=null ? "secondary": "default"} action={checkAnswer} disabled={selected.id==null}/>}

        </div>
    )

}

export default QuestionAnswers

