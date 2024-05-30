import React, { useEffect, useState } from "react"

export default function Image(props: any) {

    const [width, setWidth] = useState(props.width)
    const [position, setPosition] = useState(props.position)
    const [imageUrl, setImageUrl] = useState(props.imageUrl)
    const [radius, setRadius] = useState("rounded-lg")

    useEffect(() => {
        if(props.radius=="full"){
            setRadius('rounded-full')
        }
    }, [props.radius])

    return <div className="flex h-max w-full" style={{ justifyContent: position }} >
        <img className={`${radius}`} src={imageUrl} />
    </div>
}