import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { updateBlock } from "../../../reducers/pageReducer"
import colorVariants from "../../../util/colorVariants"
import Button from "../../button/Button"
import Item from "../../item/Item"

export default function ColorEditor(props: any) {

    const [value, setValue] = useState(props.value)
    const dispatch = useDispatch()

    const colors = ['blue', 'green', 'yellow', 'rose', 'red', 'brown', 'white']

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
            {colors.map((color: any) => <Item text={color} color={colorVariants[color]} id={color} selected={value} action={select} />)}
        </div>
        <Button text="Update" action={update} />
    </div>
}