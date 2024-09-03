import React, { useState } from "react"
import './../../index.css'

export default function Tooltip(props: any) {

    const [on, toggleTooltip] = useState(false)
    const [top, setTop] = useState(0)
    const [left, setLeft] = useState(0)

    const toggle = (e) => {
        // TODO: Refactor hack with transformed props
        
        const rect = e.target.getBoundingClientRect()
        setTop(rect.top)
        setLeft(rect.left)
        toggleTooltip(!on)
    }

    return <div>
        <div className={`${(on && !props.transformed) ? 'block' : 'hidden'} fixed`} style={{ top: top, left: left, transform: 'translateY(-120%)' }}>
            <div className="p-1 px-3 rounded-md bg-[black] !text-[white] shadow">
                <div>{props.message}</div>
            </div>
        </div>

        {
            (on && props.transformed) &&
            <div className="absolute -translate-x-[100%] w-max">
                <div className=" -translate-y-[120%] translate-x-[100%] p-1 px-3 rounded-md bg-[black] !text-[white] shadow">
                    <div>{props.message}</div>
                </div>
            </div>

        }

        <div onMouseEnter={toggle} onMouseLeave={toggle}>{props.children}</div>
    </div>

}

