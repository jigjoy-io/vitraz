import { ReactElement } from "react"
import BlockFactory from "../../../factories/BlockFactory"

export default abstract class EditableBlock {

    block: ReactElement

    abstract addToolbar(props: any): EditableBlock

    setBlock(props: any): EditableBlock {
        this.block = BlockFactory.get(props)
        return this
    }

    abstract get(props: any): ReactElement



} 