import React, { useState } from 'react'

import ToolbarButtonWrapper from './ToolbarButtonWrapper'
import Item from '../item/Item'
import Grid from '../grid/Grid'
import PopoverContent from '../popover/PopoverContent'
import PopoverTrigger from '../popover/PopoverTrigger'
import OpenMenuIcon from '../../icons/OpenMenuIcon'
import Popover from '../popover/Popover'
import { useExpandedToolbar } from '../../util/store'
import { useDispatch } from 'react-redux'
import { blockingUpdated, expandedToolbarUpdated } from '../../reducers/toolbarReducer'
import { AddNewBlock } from './builder/AddNewBlock'
import { DuplicateBlockIcon } from '../../icons/DuplicateBlockIcon'
import DeleteBlockIcon from '../../icons/DeleteBlockIcon'
import { removeBlock } from '../../reducers/pageReducer'

interface ToolbarOptions {
    id: string,
    editingOptions: any,
    block: any,
    children: any
}

export default function Toolbar(props: ToolbarOptions) {

    const [on, setOn] = useState(false)
    const [editingActive, setEditingActive] = useState(null)

    const expandedToolbar = useExpandedToolbar()
    const dispatch = useDispatch()

    const turnOnToolbar = (e: any) => {
        setOn(true)
    }

    const turnOffToolbar = () => {
        setOn(false)
    }

    const expandToolbar = () => {
        dispatch(blockingUpdated(true))
        dispatch(expandedToolbarUpdated(props.id))
    }

    const onClose = () => {
        dispatch(blockingUpdated(false))
        dispatch(expandedToolbarUpdated(null))
    }

    const deleteBlock = () => {
        onClose()
        dispatch(removeBlock(props.id))
    }

    return (<>
        <div onMouseEnter={turnOnToolbar} onMouseLeave={turnOffToolbar} className="flex flex-col">
            {(on || expandedToolbar == props.id || editingActive != null) &&
                <div className="absolute -translate-x-[100%] px-2">
                    <div className='flex flex-row'>
                        <AddNewBlock />
                        <div>
                            <Popover onClose={onClose}>
                                <PopoverTrigger >
                                    <div onClick={() => expandToolbar()}>
                                        <ToolbarButtonWrapper tooltip="open menu">
                                            <OpenMenuIcon />
                                        </ToolbarButtonWrapper>
                                    </div>

                                </PopoverTrigger>
                                <PopoverContent>
                                    <Grid numberOfCols={1}>
                                        <Item text="Duplicate block" icon={DuplicateBlockIcon} action={() => { alert("home") }} />
                                        <Item text="Delete block" textColor="red" icon={DeleteBlockIcon} action={deleteBlock} />
                                        <div className='border-b border-default-light' />
                                        {
                                            props.editingOptions.map((option: any, index) =>
                                                <Popover key={index} onClose={() => setEditingActive(null)}>
                                                    <PopoverTrigger>
                                                        <Item text={option.name} icon={option.icon} action={() => setEditingActive(index)} />
                                                    </PopoverTrigger>
                                                    <PopoverContent isOpen={editingActive === index}>
                                                        <option.editor id={props.id} block={props.block} attribute={option.key} value={props.block[option.key]} />
                                                    </PopoverContent>
                                                </Popover>

                                            )
                                        }
                                    </Grid>
                                </PopoverContent>
                            </Popover>

                        </div>

                    </div>

                </div>
            }
            <div className='relative w-[100%]'>
                <div className={(expandedToolbar == props.id || editingActive != null) ? "absolute opacity-40 bg-primary z-80 rounded-md h-[100%] w-[100%]" : ''}></div>
                {props.children}
            </div>

        </div>

    </>

    )

}

