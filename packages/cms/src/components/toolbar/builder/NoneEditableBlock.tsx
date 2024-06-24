import EditableBlockBuilder from "./EditableBlock"

export default class NoneEditableBlock extends EditableBlockBuilder {

    addToolbar(props: any): EditableBlockBuilder {
        throw new Error("Method not implemented.")
    }

    get(props: any): any {

        return this.setBlock(props)
                .block
    }



} 