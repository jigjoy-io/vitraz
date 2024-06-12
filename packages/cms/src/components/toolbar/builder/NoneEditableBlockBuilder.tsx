import EditableBlockBuilder from "./EditableBlockBuilder"

export default class NoneEditableBlockBuilder extends EditableBlockBuilder {

    addToolbar(props: any): EditableBlockBuilder {
        throw new Error("Method not implemented.")
    }

    createEditableBlock(props: any): any {

        return this.setBlock(props)
                .block
    }



} 