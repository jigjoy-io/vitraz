import React from "react"
import Heading from "../../../../components/heading/heading"
import Text from "../../../../components/text/text"
import LocalizedStrings from "react-localization"
import { useLanguage } from "../../../../util/store"

let localization = new LocalizedStrings({
    US: {
        comingSoon: "Analytics Coming Soon!",
        collectLeads: 'Collect leads and view key insights soon.'
    },
    RS: {
        comingSoon: "Uskoro dostupna analitika na stranicama!",
        collectLeads: 'Prikupljanje mejlova i pregled analitike.'
    }
})

export default function ViewAnalytics() {

    const lang = useLanguage()
    localization.setLanguage(lang)

    return <div className="mt-20 flex flex-col justify-center items-center gap-3">
        <Heading position="center" text={localization.comingSoon} />
        <Text text={localization.collectLeads} />
    </div>
}