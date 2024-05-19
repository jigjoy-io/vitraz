import React from 'react'

export default class ToolbarButtonWrapper extends React.Component<any> {

    constructor(props: any) {
        super(props)

    }

    render() {
        return (
            <div className="rounded-md hover:bg-primary-light border-2 border-[white] hover:border-primary p-1 cursor-pointer">
            {this.props.children}
        </div>
        )

    }


}
