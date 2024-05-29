import React, { useState } from 'react'
import { useEffect } from 'react'
import SuccessIcon from '../../icons/SuccessIcon'

export default function Alert (props: any) {

    const [bg, setBg] = useState("bg-alert-success")
    const [icon, setIcon] = useState(null)

    const data : any = {
        success: {
            bg: "bg-alert-success",
            icon: SuccessIcon
        },
        danger: {
            bg: "bg-alert-danger",
            icon: SuccessIcon
        }
    }

    useEffect(()=>{
        let type = data[props.type]
        setBg(type.bg)
        setIcon(type.icon)
    }, [])

    const renderIcon = () => {
        let config = data[props.type]
        return <config.icon />
    }

    return (
        <div className={`${bg} p-4 rounded-lg`}>
            <div className='flex'>
                {
                    (icon != null) && renderIcon()
                }
                <div className='pl-3'>
                    <div className='font-bold'>{props.title}</div>
                    <div>{props.message}</div>
                </div>
            </div>

        </div>
    )

}