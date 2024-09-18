import React from "react"

function Progress(props: any) {

    return <div className="w-full bg-light rounded-full h-2.5 mb-3 mr-3 translate-y-[100%]">
        <div className={`bg-primary h-2.5 rounded-full border-2 border-primary`} style={{width: `${props.percentage}%`}}></div>
    </div>
}

export default Progress