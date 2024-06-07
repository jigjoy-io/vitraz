import React from 'react'

export default function ContentEditingWrapper (props: any) {

    const updateText = (event : any) => {

        //console.log(event.nativeEvent.target.innerText.trim())
    }

    const handleKeyDown = (event: any) => {

        if (event.key === 'Enter') {
            updateText(event)
        }
    }

    return (
        <div
            contentEditable={true} spellCheck="false"
            onKeyDown={handleKeyDown}
            onBlur={(e) => updateText(e)}
            className="[&[contenteditable]]:focus:border-none [&[contenteditable]]:focus:outline-none">
            {props.children}
        </div>
    )

}
