import React from 'react'
import { connect } from 'react-redux'
import { setBlockEvents } from '../../../reducers/page'

class Popover extends React.Component<any> {

    state = {
        on: this.props.on
    }

    toggle = () => {

        this.setState({
            on: !this.state.on
        }, () => {
            this.props.setBlockEvents(this.state.on)
        })

    }



    render() {
        return (
            <div className='flex flex-row'>
                {React.Children.map(this.props.children, child =>
                    React.cloneElement(child, { on: this.state.on, toggle: this.toggle }))}
            </div>
        )
    }

}

const mapDispatchToProps = {
    setBlockEvents
}

export default connect(null, mapDispatchToProps)(Popover)
