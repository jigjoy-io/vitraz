import React from "react"
import Tile from "../tile/tile"
import Heading from "../heading/heading"
import Text from "../text/text"

export default function Profile(props: any) {

    return <Tile color={props.color}>
        <div className="flex flex-row gap-4">

            <img className="float-left rounded-[100%]" height={128} width={128} src={props.image} />

            <div className="flex flex-col items-center justify-center w-[100%] break-all">
                <Heading position="center" text={props.headline}></Heading>
                <div className="p-1">{props.username}</div>
            </div>

        </div>
        <div className="pt-4 w-max[100%] break-words">
            <Text text={props.description}></Text>
        </div>
    </Tile>
}