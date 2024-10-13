import React from "react"
import Tile from "../tile/tile"
import Heading from "../heading/heading"
import Text from "../text/text"

export default function Profile(props: any) {

    return <Tile color={props.color}>
        <div className="flex flex-row gap-4 break-all">

            <img className="w-32 h-32 flex-shrink-0 rounded-[100%]" src={props.image} />

            <div className="flex flex-col items-center justify-center w-[100%]">
                <Heading position="center" text={props.headline}></Heading>
                <div className="p-1">{props.username}</div>
            </div>

        </div>
        <div className="pt-4 break-all">
            <Text text={props.description}></Text>
        </div>
    </Tile>
}