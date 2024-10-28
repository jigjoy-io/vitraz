import React from "react"
import LocalizedStrings from "react-localization"
import { RequestType } from "../../../../api/feedback"
import UserFeedback from "./userFeedback"
import { useLanguage } from "../../../../util/store"

let localization = new LocalizedStrings({
	US: {
		heading: "Premium Service",
		description: "Need help with content creation? Our team will create an app for you to efficiently collect leads and engage your audience.",
		placeholder: "Leave a message, and we’ll contact you soon.",
		errorMessage: "The message field is required. Please enter your message.",
		successMessage: "Your message has been successfully saved. Our team will contact you shortly.",
		cta: "Submit",
	},
	RS: {
		heading: "Premium usluga",
		description: "Treba vam pomoć sa kreiranjem sadržaja? Naš tim će vam kreirati aplikaciju za efikasno prikupljanje lead-ova i angažovanje publike.",
		placeholder: "Ostavite poruku, i uskoro ćemo vas kontaktirati.",
		errorMessage: "Molimo vas popunite polje za poruku.",
		successMessage: "Vaša poruka je uspešno sačuvana. Uskoro će vas kontaktirati naš tim.",
		cta: "Posalji",
	},
})
export default function Premium() {
	const lang = useLanguage()
	localization.setLanguage(lang)

	return <UserFeedback localization={localization} requestType={RequestType.PREMIUM_REQUEST} />
}
