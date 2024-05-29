import React, { useState } from "react"
import './../../index.css'

export default function Tooltip(props: any) {

    const [on, toggleTooltip] = useState(false)

    const toggle = () => {
        toggleTooltip(!on)
    }

    return <div className="w-fit">
        {
            on &&
            <div className="absolute -translate-x-[100%] w-max">
                <div className=" -translate-y-[120%] translate-x-[100%] p-1 px-3 rounded-md bg-[black] !text-[white] shadow">
                    <div>{props.message}</div>
                </div>
            </div>

        }

        <div onMouseEnter={toggle} onMouseLeave={toggle}>{props.children}</div>
    </div>

}

