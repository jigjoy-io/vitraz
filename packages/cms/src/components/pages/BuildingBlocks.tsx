import React from "react"
import { connect } from "react-redux"

class BuildingBlocks extends React.Component<any>{

    state = {
        buildingBlocks: this.props.config.buildingBlocks
    }

    componentDidUpdate(prevProps: any) {
        if (this.props.config !== prevProps.config) {
            this.setState({ buildingBlocks: this.props.config.buildingBlocks })
        }
    }

    render() {
        return <></>

    }
}

const mapStateToProps = (state: any) => {
    return {
        config: state.page.config
    }
}
export default connect(mapStateToProps, null)(BuildingBlocks)