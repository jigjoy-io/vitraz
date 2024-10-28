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

	return <ReactFlagsSelect selected={selected} countries={["US", "RS"]} onSelect={(code) => switchLanguage(code)} className="h-[45px] w-full bg-[white] border border-light shadow-lg rounded-lg outline-none" />
}
