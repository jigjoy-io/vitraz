import React, { useRef, useState } from 'react'
import { useEffect } from 'react'
import './../../index.css'

function Popover(props: any) {

    const [on, setOn] = useState(props.on)
    const [rect, setRect] = useState<null | any>(null)
    const ref = useRef<HTMLDivElement>(null)


    const toggle = () => {
        setOn(!on)
    }

    useEffect(() => {
        if (ref.current)
            setRect(ref.current.getBoundingClientRect())
    }, [on])

    return (
        <div className='relative flex flex-row w-max' ref={ref} >
            {React.Children.map(props.children, child =>
                React.cloneElement(child, { on: on, toggle: toggle, rect: rect }))}
        </div>
    )

}


export default Popover
