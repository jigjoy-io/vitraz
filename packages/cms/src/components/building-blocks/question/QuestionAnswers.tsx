import React from "react"
import Button from "../Button"

export default class QuestionAnswers extends React.Component<any> {

    children = React.Children.toArray(this.props.children)


    state = {
        message: "Bravo majstore!",
        correct: null,
        answered: null
    }

    constructor(props: any) {
        super(props)

    }

    action = (outcome) => {
        this.setState({
            answered: false
        })

        if(outcome.correct){
            this.setState({
                message: 'Bravo majstore!',
                correct: outcome.correct
            })
        }else{
            this.setState({
                message: 'Prouči malo istoriju',
                correct: false
            })
        }
    }

    checkAnswer = () => {
        this.setState({
            answered: true
        })

    }

    render() {
        return (

            <div className='flex flex-col gap-3'>
                {this.state.answered && <div className={`${this.state.correct ? 'bg-correct': 'bg-incorrect'} p-4 rounded-lg font-bold`}>{this.state.message}</div>}
                {React.Children.map(this.props.children, child =>
                    React.cloneElement(child, { action: this.action, borderOn: true, answered: this.state.answered }))}
                <Button action={this.checkAnswer}>Check the answer</Button>
            </div>
        )
    }

}