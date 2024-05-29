import React, { useEffect } from "react"
import { useState } from "react"

function Progress(props: any) {
    
    const [precentage, setPrecentage] = useState('w-[0%]')
    
    useEffect(()=>{
        if(props.precentage>=0 && props.precentage<=100){
            setPrecentage(`w-[${props.precentage}%]`)
        }
    },[props.precentage])

    return <div className="w-full bg-light rounded-full h-2.5 mb-4 mr-3 translate-y-[100%]">
        <div className={`bg-primary h-2.5 rounded-full ${precentage} border-2 border-primary`}></div>
    </div>
}

export default Progress