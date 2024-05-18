import React from 'react'

export default class ContentEditingWrapper extends React.Component<any> {

    render() {
        return (
            <div contentEditable={true}
                className="[&[contenteditable]]:focus:border-none [&[contenteditable]]:focus:outline-none">
                {this.props.children}
            </div>
        )

    }


}
