import React from "react"
import Heading from "../../../../components/heading/heading"
import Text from "../../../../components/text/text"
import LocalizedStrings from "react-localization"
import { useLanguage } from "../../../../util/store"
import Button from "../../../../components/button/button"
import TextArea from "../../../../components/textarea/textarea"


let localization = new LocalizedStrings({
    US: {
        contactUs: "Contact Us",
        description: "If you have encountered an issue or have suggestions for improving the platform, let our team know.",
        placeholder: "Leave a message, and we’ll contact you soon.",
        cta: "Submit"
    },
    RS: {
        contactUs: "Kontaktiraj podršku",
        description: "Ako ste se susreli sa problemom ili imate sugestije za poboljšanje platforme javite se našem timu.",
        placeholder: "Ostavite poruku, i uskoro ćemo vas kontaktirati.",
        cta: 'Posalji'
    }
})
export default function Help() {

    const lang = useLanguage()
    localization.setLanguage(lang)


    const handleChange = (value) => {
        console.log(value)
    }

    return <div className="mt-20 flex flex-col justify-center items-center gap-6 px-20">
        <Heading position="center" text={localization.contactUs} />
        <Text position="center" text={localization.description} />
        <div className="w-[500px]">
            <TextArea placeholder={localization.placeholder} onChange={handleChange}/>
        </div>
        <Button text={localization.cta} />
    </div>
}