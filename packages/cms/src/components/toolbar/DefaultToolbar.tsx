import React from 'react'
import { connect } from 'react-redux'
import { closeToolbar, openToolbar } from '../../reducers/page'
import Group from '../building-blocks/Group'
import Item from '../building-blocks/Item'
import Content from '../building-blocks/popover/Content'
import Popover from '../building-blocks/popover/Popover'
import Trigger from '../building-blocks/popover/Trigger'
import { AddBlockIcon } from './AddBlockIcon'
import { OpenMenuIcon } from './OpenMenuIcon'
import ToolbarButtonWrapper from './ToolbarButtonWrapper'

class DefaultToolbar extends React.Component<any> {

    state = {
        on: false,
        toolbarExpaned: this.props.toolbar == this.props.id
    }

    componentDidUpdate(prevProps: any) {

        if (this.props.toolbar != prevProps.toolbar) {
            this.setState({ toolbarExpaned: this.props.toolbar == this.props.id })
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
                                        <Group layout="column">
                                            <Item><div className='w-[200px]'>Item 1</div></Item>
                                            <Item>Item 2</Item>
                                            <Item>Item 3</Item>
                                            <Item>Item 4</Item>
                                            <Item>Item 5</Item>
                                        </Group>
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
        toolbar: state.page.toolbar
    }
}

const mapDispatchToProps = {
    openToolbar,
    closeToolbar
}

export default connect(mapStateToProps, mapDispatchToProps)(DefaultToolbar)