import LocalizedStrings from 'react-localization'
import { v4 as uuid } from 'uuid'

let localization = new LocalizedStrings({
    en: {
        questionText: "Question text...",
        answerText1: "Answer 1 text",
        answerText2: "Answer 2 text",
        answerText3: "Answer 3 text",
        confirmationButtonText: 'Check the answer',
        correctMessage: 'The answer is correct.',
        correctTitle: 'Great!',
        incorrectMessage: 'The answer is not correct."',
        incorrectTitle: 'Better luck next time',
        messageText: "Message text goes here...",
        headline: 'Headline',
        description: 'Decription...',
        username: '@username',
        cta: 'Start',
        title: 'Title',
        carousel: 'Carousel',
        blankPage: 'Blank Page'
    },
    sr: {
        questionText: "Tekst pitanja...",
        answerText1: "Tekst 1. odgovora",
        answerText2: "Tekst 2. odgovora",
        answerText3: "Tekst 3. odgovora",
        confirmationButtonText: 'Proveri odgovor',
        correctMessage: 'Odogovr je tačan.',
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
        blankPage: 'Prazna stranica'
    }
})

localization.setLanguage('sr')


export const templates = {
    "audio": {
        type: "audio",
        source: "https://www.w3schools.com/html/mov_bbb.mp4",
        position: "left"
    },
    "text": {
        type: "text",
        text: "",
        position: "left"
    },
    "heading": {
        type: "heading",
        text: "",
        position: "left"
    },
    "title": {
        type: "title",
        text: "",
        position: "left"
    },
    "image": {
        type: "image",
        source: "https://jigjoy.io/assets/placeholderimage.jpg",
        position: "left",
        size: 'large'
    },
    "question": {
        type: 'question',
        content: {
            displayQuestion: true,
            text: localization.questionText,
            displayImage: true,
            image: "https://jigjoy.io/assets/placeholderimage.jpg"
        },
        answers: [
            {
                id: uuid(),
                correct: false,
                text: localization.answerText1
            },
            {
                id: uuid(),
                correct: true,
                text: localization.answerText2
            },
            {
                id: uuid(),
                correct: false,
                text: localization.answerText3
            }
        ],
        outcomes: {
            confirmationButtonText: localization.confirmationButtonText,
            correct: {
                message: localization.correctMessage,
                title: localization.correctTitle,
                type: "success"
            },
            incorrect: {
                message: localization.incorrectMessage,
                title: localization.incorrectTitle,
                type: "danger"
            }
        },
    },
    "message": {
        type: "message",
        message: localization.messageText,
        audio: "https://www.w3schools.com/html/mov_bbb.mp4",
        position: "left",
        color: "rose"
    },
    "reel": {
        type: "reel",
        source: "https://www.w3schools.com/html/mov_bbb.mp4",
        position: "left"
    },
    "profile": {
        type: "profile",
        headline: localization.headline,
        description: localization.description,
        image: "https://jigjoy.io/assets/placeholderimage.jpg",
        username: localization.username
    },
    "carousel-tile": {
        type: "carousel-tile",
        cta: localization.cta
    },
    "block-selector": {
        type: "block-selector"
    },
    "carousel-configurer": {
        type: "carousel-configurer",
        accessType: "freebie",
        title: localization.title,
        description: localization.description,
        numberOfPages: 3,
        display: true
    },
    "carousel": {
        type: "carousel",
        name: localization.carousel,
        environment: 'development',
        linkedPageId: null,
        config: {
            pages: []
        }
    },
    "page-configurer": {
        type: "page-configurer",
        accessType: "freebie",
        title: localization.title,
        description: localization.description,
        display: true
    },
    "page-tile": {
        type: "page-tile",
        cta: localization.cta
    },
    "blank": {

        type: "blank",
        name: localization.blankPage,
        environment: 'development',
        linkedPageId: null,
        config: {
            buildingBlocks: []
        }
    }
}