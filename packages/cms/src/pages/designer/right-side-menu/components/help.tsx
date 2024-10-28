import React from "react"
import LocalizedStrings from "react-localization"
import { useLanguage } from "../../../../util/store"
import { RequestType } from "../../../../api/feedback"
import UserFeedback from "./userFeedback"

let localization = new LocalizedStrings({
	US: {
		heading: "Contact Us",
		description: "If you have encountered an issue or have suggestions for improving the platform, let our team know.",
		placeholder: "Leave a message, and we’ll contact you soon.",
		errorMessage: "The message field is required. Please enter your message.",
		successMessage: "Your message has been successfully saved. Our team will contact you shortly.",
		cta: "Submit",
	},
	RS: {
		heading: "Kontaktiraj podršku",
		description: "Ako ste se susreli sa problemom ili imate sugestije za poboljšanje platforme javite se našem timu.",
		placeholder: "Ostavite poruku, i uskoro ćemo vas kontaktirati.",
		errorMessage: "Molimo vas popunite polje za poruku.",
		successMessage: "Vaša poruka je uspešno sačuvana. Uskoro će vas kontaktirati naš tim.",
		cta: "Posalji",
	},
})
export default function Help() {
	const lang = useLanguage()
	localization.setLanguage(lang)

	return <UserFeedback localization={localization} requestType={RequestType.HELP_REQUEST} />
}
