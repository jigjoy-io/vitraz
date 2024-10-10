import LocalizedStrings from "react-localization"

let localization = new LocalizedStrings({
    US: {
        questionText: "Question text...",
        answerText1: "Answer 1 text",
        answerText2: "Answer 2 text",
        answerText3: "Answer 3 text",
        confirmationButtonText: 'Check the answer',
        correctMessage: 'The answer is correct.',
        correctTitle: 'Great!',
        incorrectMessage: 'The answer is not correct.',
        incorrectTitle: 'Better luck next time',
        messageText: "Message text goes here...",
        headline: 'Headline',
        description: 'Decription...',
        username: '@username',
        cta: 'Start',
        title: 'Title',
        carousel: 'Carousel',
        blankPage: 'Blank Page',
        previous: "Previous",
        next: "Next",
        backToHome: "Back to Home"
    },
    RS: {
        questionText: "Tekst pitanja...",
        answerText1: "Tekst 1. odgovora",
        answerText2: "Tekst 2. odgovora",
        answerText3: "Tekst 3. odgovora",
        confirmationButtonText: 'Proveri odgovor',
        correctMessage: 'Odgovor je tačan.',
        correctTitle: 'Bravo!',
        incorrectMessage: 'Odgovor je netačan.',
        incorrectTitle: 'Više sreće drugi put',
        messageText: "Tekst poruke ide ovde...",
        headline: 'Ime i prezime',
        description: 'Opis...',
        username: '@korisničko_ime',
        cta: 'Počni',
        title: 'Naslov',
        carousel: "Karusel",
        blankPage: 'Prazna stranica',
        previous: "Nazad",
        next: "Napred",
        backToHome: "Povratak na početnu"
    }
})

export default localization