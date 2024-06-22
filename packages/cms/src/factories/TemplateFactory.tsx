import React from "react"
import { v4 as uuidv4 } from 'uuid'
import { templates } from "../util/blockTemplates"

export default class TemplateFactory extends React.Component {


    static get(type: string) {
        let block: any = templates[type]
        let template = JSON.parse(JSON.stringify(block))
        template.id = uuidv4()
        return template
    }
}