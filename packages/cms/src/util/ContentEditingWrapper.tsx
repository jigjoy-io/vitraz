import React from 'react'

export default class ContentEditingWrapper extends React.Component<any> {

    constructor(props: any) {
        super(props)

    }

    updateText(event) {

        console.log(event.nativeEvent.target.innerText.trim())
    }

    handleKeyDown = (event: any) => {

        if (event.key === 'Enter') {
            this.updateText(event)
        }
    }

    render() {
        return (
            <div
                contentEditable={true} spellCheck="false"
                onKeyDown={this.handleKeyDown}
                onBlur={(e) => this.updateText(e)}
                className="[&[contenteditable]]:focus:border-none [&[contenteditable]]:focus:outline-none">
                {this.props.children}
            </div>
        )

    }


}
