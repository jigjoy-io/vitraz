import React from "react";

export default function Tabs(props: any) {

    
    return <>
    <div className="flex gap-3">
        {React.Children.map(props.children, child =>
            <div className="text-primary">{child.key}</div>)}
    </div>
    </>
}