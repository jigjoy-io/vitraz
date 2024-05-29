import React from 'react'
import Button from '../button/Button'
import Group from '../grid/Grid'
import './../../index.css'

export default class Chapter extends React.Component<any> {

    state = {
		color: this.props.color
	}

    componentDidMount() {
		if (this.props.color == "blue") {
			this.setState({
				color: "bg-[#EFFDFB]"
			})
		} else if (this.props.color == "brown"){
            this.setState({
                color: "bg-brown"
            })
        }
		else {
			this.setState({
				color: "bg-[FFFFFF]"
			})
		}
	}

    render() {
        return (
            <div className={`${this.state.color} rounded-lg shadow w-[100%] px-4 py-8 border border-light`}>
                <div className='font-bold text-2xl'>{this.props.title}</div>

                {this.props.description && <div className='pt-4 text-xl'>{this.props.description}</div>}
                {this.props.price && <div className='pt-4 font-bold text-4xl'><sup className='text-md'>$</sup> {this.props.price}</div>}
                <div className='pt-4'>
                    
                    <Group layout="row">
                        <Button text="Detalji" />
                        <Button text="Pokreni" color="primary" />
                    </Group>
                </div>

            </div>
        )
    }

}