import React, { useEffect, useState } from "react"

export default function Tile(props: any){

    const [color, setColor] = useState('')

    useEffect(()=> {

        if (props.color == "green") {
            setColor("bg-[#EFFDFB]")
        } else if (props.color=="blue") {
            setColor("bg-[#E5EFFA]")
        }else if (props.color == "brown") {
            setColor("bg-brown")
        }
        else {
            setColor("bg-[FFFFFF]")
        }

    }, [props.color])

    return <div className={`${color} rounded-[20px] shadow w-[100%] px-4 py-8 border border-light`}>
        {props.children}
    </div>
}