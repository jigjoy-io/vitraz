import React, { useState } from "react"
import { useDispatch } from "react-redux"
import LocalizedStrings from "react-localization"
import { updateBlock } from "../../../../reducers/page-reducer"
import Button from "../../../../components/button/button"
import colorVariants from "../../../../util/color-variants"
import Item from "../../../../components/item/item"

let localization = new LocalizedStrings({
    US: {
        update: "Update",
        colors: [
            { text: 'Blue', key: 'blue' },
            { text: 'Green', key: 'green' },
            { text: 'Yellow', key: 'yellow' },
            { text: 'Rose', key: 'rose' },
            { text: 'Red', key: 'red' },
            { text: 'Brown', key: 'brown' },
            { text: 'White', key: 'white' }
        ]
    },
    RS: {
        update: "Promeni",
        colors: [
            { text: 'Plava', key: 'blue' },
            { text: 'Zelena', key: 'green' },
            { text: 'Žuta', key: 'yellow' },
            { text: 'Roze', key: 'rose' },
            { text: 'Crvena', key: 'red' },
            { text: 'Braon', key: 'brown' },
            { text: 'Bela', key: 'white' }
        ]
    }
})

export default function ColorEditor(props: any) {

    const [value, setValue] = useState(props.value)
    const dispatch = useDispatch()
    localization.setLanguage(props.lang)

    const update = () => {

        let block = JSON.parse(JSON.stringify(props.block))
        block[props.attribute] = value
        dispatch(updateBlock(block))
    }

    const select = (event, option) => {
        setValue(option.id)
    }

    return <div className="flex flex-col p-2">
        <div className="pb-3">
            {localization.colors.map((color: any) => <Item tabFocus={false} text={color.text} color={colorVariants[color.key]} id={color.key} selected={value} action={select} />)}
        </div>
        <Button text={localization.update} action={update} />
    </div>
}