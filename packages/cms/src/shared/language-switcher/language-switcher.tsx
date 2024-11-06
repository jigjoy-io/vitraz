import React, { useState } from "react"
import ReactFlagsSelect from "react-flags-select"
import { useDispatch } from "react-redux"
import { languageUpdated } from "../../reducers/localization-reducer"

export default function LanguageSwitcher(props) {
	const dispatch = useDispatch()
	const [selected, setSelected] = useState(props.initial)

	const switchLanguage = (code) => {
		setSelected(code)
		dispatch(languageUpdated(code))
	}

	return <ReactFlagsSelect selected={selected} selectedSize={14} optionsSize={14} countries={["US", "RS"]} onSelect={(code) => switchLanguage(code)} className="w-full h-[40px] bg-[white] shadow-lg rounded-[5px]" />
}
