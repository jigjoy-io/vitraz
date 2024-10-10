import LocalizedStrings from "react-localization"
import { store } from "../../util/store"

const localization = new LocalizedStrings({
	US: {
		welcomeMessage: "Welcome to JigJoy 👏",
		emailPlaceholder: 'Enter Your Email',
		authButton: 'Log in or Sign up',
		postLoginMessage: 'Log in link has been sent to provided email'
	},
	RS: {
		welcomeMessage: "Dobrodošli na JigJoy platformu 👏",
		emailPlaceholder: 'Unesite mejl',
		authButton: 'Prijavi se ili Registruj',
		postLoginMessage: 'Link za logovanje je poslat na mejl.'
	}
})

const state = store.getState()
localization.setLanguage(state.localization.language)

export default localization