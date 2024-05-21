import React from 'react'
import contentEditing from '../../decorators/contentEditing'

@contentEditing()
export default class Button extends React.Component<any> {

    render() {
        return (
            <button className="bg-[black] text-[white] px-5 p-3 rounded-lg cursor-pointer hover:opacity-80 w-[100%]" onClick={this.props.action}>
                {this.props.children}
            </button>
        )
    }

}