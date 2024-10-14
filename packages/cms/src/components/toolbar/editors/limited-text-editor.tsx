import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateBlock } from "../../../reducers/page-reducer";
import Button from "../../button/button";
import LocalizedStrings from "react-localization";

let localization = new LocalizedStrings({
    US: {
        update: "Update",
    },
    RS: {
        update: "Promeni",
    },
});

export default function LimitedTextEditor(props: any) {
    const [value, setValue] = useState(props.value);
    const dispatch = useDispatch();
    localization.setLanguage(props.lang);

    const update = () => {
        let block = JSON.parse(JSON.stringify(props.block));
        block[props.attribute] = value;
        dispatch(updateBlock(block));
    };

    useEffect(() => {
        console.log("LIMIT", props.limit)
        console.log("PROPS", props)
    }, [])

    return (
        <div className="flex flex-col p-2">
            <input
                className="p-2 rounded-lg border w-[100%] mb-2"
                value={value}
                maxLength={props.limit}
                onChange={(event) => setValue(event.target.value)}
            />
            <div className="text-sm mb-2">
                {value.length} / {props.limit}
            </div>
            <Button text={localization.update} action={update} />
        </div>
    );
}
