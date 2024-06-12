import React from "react"
import Tile from "../../util/Tile"
import Heading from "../heading/Heading"
import Text from "../text/Text"
import Image from "../image/Image"

export default function Profile(props: any) {
    
    return <div>
        <Tile color={props.color}>
            <div className="flex flex-row gap-4">
                <div>
                    <Image imageUrl={props.image} radius="full" />
                </div>

                <div className="flex flex-col">
                    <Heading text={props.headline}></Heading>
                    <div className="p-1">{props.username}</div>
                </div>

            </div>
            <div className="pt-4">
                <Text text={props.description}></Text>
            </div>
        </Tile>
    </div>
}