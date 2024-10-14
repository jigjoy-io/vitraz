import React, { useEffect, useState } from 'react'
import Text from '../text/text'

interface LimitedTextProps {
    text: string,
    limit: number
}

export default function LimitedText({ text, limit }: LimitedTextProps) {
    const [counter, setCounter] = useState(text.length)

    useEffect(() => {
        setCounter(text.length);
    }, [text]);

    return (
        <div className='relative'>
            <Text text={text} />
            <span>{counter} / {limit}</span>
        </div>
    )
}