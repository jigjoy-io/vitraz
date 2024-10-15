import React from "react"
import Heading from "../../../../components/heading/heading"
import Text from "../../../../components/text/text"
import LocalizedStrings from "react-localization"
import { useLanguage } from "../../../../util/store"
import Button from "../../../../components/button/button"
import TextArea from "../../../../components/textarea/textarea"


let localization = new LocalizedStrings({
    US: {
        premium: "Premium Service",
        description: "Need help with content creation? Our team will create an app for you to efficiently collect leads and engage your audience.",
        placeholder: "Leave a message, and we’ll contact you soon.",
        cta: "Submit"
    },
    RS: {
        premium: "Premium usluga",
        description: "Treba vam pomoć sa kreiranjem sadržaja? Naš tim će vam kreirati aplikaciju za efikasno prikupljanje lead-ova i angažovanje publike.",
        placeholder: "Ostavite poruku, i uskoro ćemo vas kontaktirati.",
        cta: 'Posalji'
    }
})
export default function Premium() {

    const lang = useLanguage()
    localization.setLanguage(lang)


    const handleChange = (value) => {
        console.log(value)
    }

    return <div className="mt-20 flex flex-col justify-center items-center gap-6 px-20">
        <Heading position="center" text={localization.premium} />
        <Text position="center" text={localization.description} />
        <div className="w-[500px] max-w-[100%]">
            <TextArea placeholder={localization.placeholder} onChange={handleChange}/>
        </div>
        <Button text={localization.cta} />
    </div>
}