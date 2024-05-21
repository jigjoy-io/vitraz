import React from "react"

export default class Image extends React.Component<any>{

    state = {
        width: this.props.width,
        position: this.props.position,
        imageUrl: "https://s3.eu-west-1.amazonaws.com/create.jigjoy.io/assets/image+4.png"
    }



    render() {
        return <div className="flex" style={{ justifyContent: this.state.position }} >
            <img className="rounded-lg" style={{width: this.state.width}} src={this.state.imageUrl} />
        </div>
    }
}