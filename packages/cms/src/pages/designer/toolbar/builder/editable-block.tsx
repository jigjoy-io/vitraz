import React from "react"
import { ReactElement } from "react"
import BlockFactory from '../../../../util/factories/block-factory'
import gaps from '../../../../util/gaps'

export default abstract class EditableBlock {

    block: ReactElement

    abstract addToolbar(props: any): EditableBlock

    addGap(props: any): EditableBlock {
        this.block = <div className={`${gaps[props.type]}`}>{this.block}</div>
        return this
    }

    setBlock(props: any): EditableBlock {
        this.block = BlockFactory.get(props)
        return this
    }

    abstract get(props: any): ReactElement

} 