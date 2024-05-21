import React from "react"

export class Tooltip extends React.Component<any> {

    state = {
        on: false
    }

    toggle = () => {
        this.setState({
            on: !this.state.on
        })
    }

    render() {
        return <div className="w-fit">
            {
                this.state.on &&
                <div className="absolute -translate-x-[100%] w-max">
                    <div className=" -translate-y-[120%] translate-x-[100%] p-1 px-3 rounded-md bg-[black] !text-[white] shadow">
                        <div>{this.props.message}</div>
                    </div>
                </div>

            }

            <div onMouseEnter={this.toggle} onMouseLeave={this.toggle}>{this.props.children}</div>
        </div>

    }

}

