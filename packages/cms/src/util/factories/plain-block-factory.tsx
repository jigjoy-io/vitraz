import React from "react"
import BlockFactory from "./block-factory"
import gaps from './../gaps'

export default class PlainBlockFactory extends React.Component {

    static validBlocks = ["text", "heading", "title", "image", "question", "profile", "carousel-tile", "page-tile", "reel", "message", "audio", "cta"]

    static getBlock(props: any) {

        let validBlock = this.validBlocks.includes(props.type)
        let block = <></>
        
        if(validBlock){
            block = BlockFactory.get(props)
            block = <div className={`${gaps[props.type]}`}>{block}</div>
        }
        
        return block
    }
}