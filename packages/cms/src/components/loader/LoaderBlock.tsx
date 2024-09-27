import React from 'react';
import Text from "../text/Text";
import Spinner from "./Spinner";
import AnimatedDots from "./AnimatedDots";

const LoaderBox = (props: any) => {
    return (
        <>
            <Spinner />
            <div className={`flex flex-row items-end gap-1 ${props.textDown && "translate-y-7"}`}>
                <Text text={props.text} />
                <AnimatedDots />
            </div>
        </>
    )
}

export default LoaderBox;