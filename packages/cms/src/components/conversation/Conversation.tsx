import React, { useEffect, useState } from 'react'
import AudioButton from '../audio/AudioButton'

export default function Conversation(props: any) {

    const [messages, setMessages] = useState(props.messages)


    return (
        <div className=''>{
            (messages.length > 0) && <>{messages.map((message: any, index: number) => (
                <div className={`mt-3  flex ${(index % 2 == 0) ? "justify-start" : "justify-end"}`} key={message.id}>
                    <div className={`w-[75%] p-4 rounded-lg ${(index % 2 == 0) ? "bg-primary-light" : "bg-default-light text-right"}`}>
                        {message.content}
                        <div className={`mt-3 flex ${(index % 2 == 0) ? "justify-start" : "justify-end"}`}><AudioButton source={message.audio}/></div>
                    </div>

                </div>
            ))}</>
        }

        </div>
    )

}
