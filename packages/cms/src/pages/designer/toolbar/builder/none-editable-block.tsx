import EditableBlock from "./editable-block"

export default class NoneEditableBlock extends EditableBlock {

    addToolbar(props: any): EditableBlock {
        throw new Error("Method not implemented.")
    }

    get(props: any): any {

        return this.setBlock(props)
                .block
    }



} 