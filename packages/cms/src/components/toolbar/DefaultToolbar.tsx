import React, { useState } from 'react'

import ToolbarButtonWrapper from './ToolbarButtonWrapper'
import { AddBlockIcon } from '../../icons/AddBlockIcon'
import Item from '../item/Item'
import Grid from '../grid/Grid'
import PopoverContent from '../popover/PopoverContent'
import Trigger from '../popover/Trigger'
import OpenMenuIcon from '../../icons/OpenMenuIcon'
import Popover from '../popover/Popover'
import { useExpanedToolbar } from '../../util/store'
import { useDispatch } from 'react-redux'
import { blockingUpdated, expanedToolbarUpdated } from '../../reducers/toolbarReducer'

export default function DefaultToolbar(props: any) {

    const [on, setOn] = useState(false)
    const expanedToolbar = useExpanedToolbar()
    const dispatch = useDispatch()

    const turnOnToolbar = (e: any) => {
        setOn(true)
    }

    const turnOffToolbar = (e: any) => {
        setOn(false)
    }

    const expandToolbar = () => {
        dispatch(blockingUpdated(true))
        dispatch(expanedToolbarUpdated(props.id))
    }

    const onClose = () => {
        dispatch(blockingUpdated(false))
		dispatch(expanedToolbarUpdated(null))
    }

    return (
        <div onMouseEnter={turnOnToolbar} onMouseLeave={turnOffToolbar} className="flex">
            {(on || expanedToolbar == props.id) &&
                <div className="absolute -translate-x-[100%]">
                    <div className='flex flex-row'>
                        <ToolbarButtonWrapper tooltip="add block">
                            <AddBlockIcon />
                        </ToolbarButtonWrapper>
                        <div onClick={() => expandToolbar()}>
                            <Popover onClose={onClose}>
                                <Trigger>
                                    <ToolbarButtonWrapper tooltip="open menu">
                                        <OpenMenuIcon />
                                    </ToolbarButtonWrapper>
                                </Trigger>
                                <PopoverContent>
                                    <Grid numberOfCols={1}>
                                        <Item text="Item 1" action={() => { alert("home") }} />
                                    </Grid>
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>

                </div>
            }
            {props.children}
        </div>
    )

}

