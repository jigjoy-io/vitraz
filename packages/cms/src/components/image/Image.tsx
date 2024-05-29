import React, { useState } from "react"

export default function Image(props: any) {

    const [width, setWidth] = useState(props.width)
    const [position, setPosition] = useState(props.position)
    const [imageUrl, setImageUrl] = useState(props.imageUrl)

    return <div className="flex h-max w-full" style={{ justifyContent: position }} >
        <img className="rounded-lg" src={imageUrl} />
    </div>
}