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
import { DuplicateIcon } from '../../icons/DuplicateIcon'
import DeleteBlockIcon from '../../icons/DeleteBlockIcon'
import { insertBlock, removeBlock } from '../../reducers/pageReducer'
import { duplicateBlock } from '../../util/traversals/duplcateBlock'

export default function Toolbar(props: any) {

    const [on, setOn] = useState(false)
    const [editingActive, setEditingActive] = useState(null)
    const [blockRadius, setBlockRadius] = useState(props.blockRadius ? props.blockRadius : "rounded-lg")

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

    const duplicate = () => {
        onClose()

        let block = duplicateBlock(props.block)

        dispatch(insertBlock({
            referenceBlock: props.block.id,
            block: block
        }))
    }

    const onCloseMenu = () => {
        
        dispatch(blockingUpdated(false))
        setEditingActive(null)
    }

    return (<>
        <div onMouseEnter={turnOnToolbar} onMouseLeave={turnOffToolbar} className="sticky flex flex-col">
            {(on || expandedToolbar == props.id || editingActive != null) &&
            
                <div className="absolute -translate-x-[100%] px-2">
                    <div className='flex flex-row'>
                        <AddNewBlock id={props.id} />
                        <div>
                            <Popover onClose={onClose}>
                                <PopoverTrigger >
                                    <div onClick={() => expandToolbar()}>
                                        <ToolbarButtonWrapper tooltip={<div className='text-center text-[14px]'>Open menu</div>}>
                                            <OpenMenuIcon />
                                        </ToolbarButtonWrapper>
                                    </div>
                                </PopoverTrigger>
                                <PopoverContent position='left'>
                                    <Grid numberOfCols={1}>
                                        <Item text="Duplicate block" tabFocus={false} icon={DuplicateIcon} action={duplicate} />
                                        <Item text="Delete block" tabFocus={false} textColor="red" icon={DeleteBlockIcon} action={deleteBlock} />
                                        {
                                            props.editingOptions.map((option: any, index) => <div key={index}>
                                                {index == 0 && <div className='border-b border-default-light' />}
                                                <Popover key={index} onClose={onCloseMenu}>
                                                    <PopoverTrigger>
                                                        <Item text={option.name} tabFocus={false} icon={option.icon} action={() => setEditingActive(index)} />
                                                    </PopoverTrigger>
                                                    <PopoverContent isOpen={editingActive === index} position="right">
                                                        <option.editor id={props.id} tabFocus={false} block={props.block} attribute={option.key} value={props.block[option.key]} />
                                                    </PopoverContent>
                                                </Popover>
                                            </div>
                                            )
                                        }
                                    </Grid>
                                </PopoverContent>
                            </Popover>

                        </div>

                    </div>

                </div>
            }
            <div>
                <div className={(expandedToolbar == props.id || editingActive != null) ? `absolute opacity-40 bg-primary ${blockRadius} h-[100%] w-[100%]` : ''}></div>
                {props.children}
            </div>

        </div>

    </>

    )

}

