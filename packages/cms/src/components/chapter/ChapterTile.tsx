import React from 'react'
import { loadPage } from '../../reducers/pageReducer'
import Button from '../button/Button'
import Grid from '../grid/Grid'
import { connect } from "react-redux"

class ChapterTile extends React.Component<any> {

    state = {
        color: this.props.color
    }

    componentDidMount() {
        if (this.props.color == "blue") {
            this.setState({
                color: "bg-[#EFFDFB]"
            })
        } else if (this.props.color == "brown") {
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

    loadPage = () => {
        this.props.loadPage({ pageId: this.props.chapterId, mode: this.props.mode })
    }

    render() {
        return (
            <div className={`${this.state.color} rounded-lg shadow w-[100%] px-4 py-8 border border-light`}>
                <div className='font-bold text-2xl'>{this.props.title}</div>

                {this.props.description && <div className='pt-4 text-xl'>{this.props.description}</div>}
                {this.props.price && <div className='pt-4 font-bold text-4xl'><sup className='text-md'>$</sup> {this.props.price}</div>}
                <div className='pt-4'>

                    <Grid numberOfCols={1}>
                        <Button text="Pokreni" color="primary" action={this.loadPage} />
                    </Grid>
                </div>

            </div>
        )
    }

}

const mapDispatchToProps = {
    loadPage
}

export default connect(null, mapDispatchToProps)(ChapterTile)