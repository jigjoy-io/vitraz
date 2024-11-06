export interface IEmail {
	getSubject(): string
	getBody(magicLink: string, timeoutMins: number): string
}

class USEmail implements IEmail {
	getSubject(): string {
		return "JigJoy Login Link"
	}

	getBody(magicLink: string, timeoutMins: number): string {
		return `<html><body><p>This is your one-time sign in link (it will expire in ${timeoutMins} mins):</p>
                <a href="${magicLink}" target="_blank">link</a></body></html>`
	}
}

class SerbianEmail implements IEmail {
	getSubject(): string {
		return "JigJoy Link za Prijavu"
	}

	getBody(magicLink: string, timeoutMins: number): string {
		return `<html><body><p>Ovo je vaš jednokratni link za prijavu (isteći će za ${timeoutMins} minuta):</p>
                <a href="${magicLink}" target="_blank">link</a></body></html>`
	}
}

export class EmailFactory {
	public static getEmail(language: string): any {
		switch (language) {
			case "US":
				return new USEmail()
			case "RS":
				return new SerbianEmail()
			default:
				throw new Error("Language not supported, choose either US or RS!")
		}
	}
}
