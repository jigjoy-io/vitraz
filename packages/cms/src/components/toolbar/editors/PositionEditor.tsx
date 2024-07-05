import React, { useState } from "react"
import { useDispatch } from "react-redux"
import CenterAlignmentIcon from "../../../icons/CenterAlignmentIcon"
import LeftAlignmentIcon from "../../../icons/LeftAlignmentIcon"
import RightAlignmentIcon from "../../../icons/RightAlignmentIcon"
import { updateBlock } from "../../../reducers/pageReducer"
import Button from "../../button/Button"
import Item from "../../item/Item"

export default function PositionEditor(props: any) {

    const [value, setValue] = useState(props.value)
    const dispatch = useDispatch()

    const positions = [{ text: 'Left', key: 'left', icon: LeftAlignmentIcon },
                    { text: 'Center', key: 'center', icon: CenterAlignmentIcon },
                    { text: 'Right', key: 'right', icon: RightAlignmentIcon }]

    const update = () => {

        let block = JSON.parse(JSON.stringify(props.block))
        block[props.attribute] = value
        dispatch(updateBlock(block))
    }

    const select = (option) => {
        setValue(option.id)
    }

    return <div className="flex flex-col p-2">
        <div className="pb-3">
            {positions.map((position: any) => <Item text={position.text} icon={position.icon} id={position.key} selected={value} action={select} />)}
        </div>
        <Button text="Update" action={update} />
    </div>
}