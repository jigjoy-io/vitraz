import React from 'react'
import { connect } from 'react-redux'

import ToolbarButtonWrapper from './ToolbarButtonWrapper'
import { closeToolbar, openToolbar } from '../../reducers/toolbarReducer'
import { AddBlockIcon } from '../../icons/AddBlockIcon'
import Item from '../item/Item'
import Grid from '../grid/Grid'
import Content from '../popover/Content'
import Trigger from '../popover/Trigger'
import OpenMenuIcon from '../../icons/OpenMenuIcon'
import Popover from '../popover/Popover'

class DefaultToolbar extends React.Component<any> {

    state = {
        on: false,
        toolbarExpaned: false
    }

    componentDidUpdate(prevProps: any) {

        if (this.props.activeToolbarBlockId != prevProps.activeToolbarBlockId) {
            this.setState({ toolbarExpaned: this.props.activeToolbarBlockId == this.props.id })
        }

    }

    turnOnToolbar = (e: any) => {
        this.setState({
            on: true
        })
    }

    turnOffToolbar = (e: any) => {
        this.setState({
            on: false
        })
    }

    expandToolbar = () => {
        this.props.openToolbar(this.props.id)
    }

    render() {
        return (
            <div onMouseEnter={this.turnOnToolbar} onMouseLeave={this.turnOffToolbar} className="flex">
                {(this.state.on || this.state.toolbarExpaned) &&
                    <div className="absolute -translate-x-[100%]">
                        <div className='flex flex-row'>
                            <ToolbarButtonWrapper tooltip="add block">
                                <AddBlockIcon />
                            </ToolbarButtonWrapper>
                            <div onClick={() => this.expandToolbar()}>

                                <Popover >
                                    <Trigger>
                                        <ToolbarButtonWrapper tooltip="open menu">
                                            <OpenMenuIcon />
                                        </ToolbarButtonWrapper>
                                    </Trigger>
                                    <Content>
                                        <Grid layout="column">
                                            <Item><div className='w-[200px]'>Item 1</div></Item>
                                            <Item>Item 2</Item>
                                            <Item>Item 3</Item>
                                            <Item>Item 4</Item>
                                            <Item>Item 5</Item>
                                        </Grid>
                                    </Content>
                                </Popover>
                            </div>

                        </div>

                    </div>
                }
                {this.props.children}
            </div>
        )

    }


}

const mapStateToProps = (state: any) => {
    return {
        activeToolbarBlockId: state.toolbar.activeToolbarBlockId
    }
}

const mapDispatchToProps = {
    openToolbar,
    closeToolbar
}

export default connect(mapStateToProps, mapDispatchToProps)(DefaultToolbar)