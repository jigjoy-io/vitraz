import React from "react"
import Tile from "../tile/Tile"
import Heading from "../heading/Heading"
import Text from "../text/Text"

export default function Profile(props: any) {
    
    return <Tile color={props.color}>
            <div className="flex flex-row gap-4">

                <img className="float-left rounded-[100%]" height={128} width={128} src={props.image} />

                <div className="flex flex-col items-center justify-center w-[100%]">
                    <Heading position="center" text={props.headline}></Heading>
                    <div className="p-1">{props.username}</div>
                </div>

            </div>
            <div className="pt-4">
                <Text text={props.description}></Text>
            </div>
        </Tile>
}