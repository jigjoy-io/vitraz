import React, { useState } from 'react'

import ToolbarButtonWrapper from './ToolbarButtonWrapper'
import Item from '../item/Item'
import Grid from '../grid/Grid'
import PopoverContent from '../popover/PopoverContent'
import PopoverTrigger from '../popover/PopoverTrigger'
import OpenMenuIcon from '../../icons/OpenMenuIcon'
import Popover from '../popover/Popover'
import { useExpanedToolbar } from '../../util/store'
import { useDispatch } from 'react-redux'
import { blockingUpdated, expanedToolbarUpdated } from '../../reducers/toolbarReducer'
import { AddNewBlock } from './editors/AddNewBlock'
import { DuplicateBlockIcon } from '../../icons/DuplicateBlockIcon'
import DeleteBlockIcon from '../../icons/DeleteBlockIcon'

interface ToolbarOptions {
    id: string,
    editingOptions: any,
    children: any

}
export default function Toolbar(props: ToolbarOptions) {

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
                        <AddNewBlock />
                        <div onClick={() => expandToolbar()}>
                            <Popover onClose={onClose}>
                                <PopoverTrigger>
                                    <ToolbarButtonWrapper tooltip="open menu">
                                        <OpenMenuIcon />
                                    </ToolbarButtonWrapper>
                                </PopoverTrigger>
                                <PopoverContent>
                                    <Grid numberOfCols={1}>
                                        <Item text="Duplicate block" icon={DuplicateBlockIcon} action={() => { alert("home") }} />
                                        <Item text="Delete block" color="red" icon={DeleteBlockIcon} action={() => { alert("home") }} />
                                        <hr className='text-light'/>
                                        {
                                            props.editingOptions.map((option: any) => <Item text={option.name} icon={option.icon} action={() => { alert("home") }} />)
                                        }
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

