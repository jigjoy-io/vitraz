import LocalizedStrings from "react-localization"
import AudioEditingIcon from "../icons/audio-editing-icon"
import CarouselIcon from "../icons/carousel-icon"
import ImageEditingIcon from "../icons/image-editing-icon"
import ProfileIcon from "../icons/profile-icon"
import { RenameIcon } from "../icons/rename-icon"
import VideoEditingIcon from "../icons/video-editing-icon"

let localization = new LocalizedStrings({
    en: {
        profile: 'Profile',
        profileDescription: 'Showcase personal information and expertise.',
        blankPage: 'Blank Page',
        blankPageDescription: 'Create a sub-page inside this page',
        carousel: 'Carousel',
        carouselDescription: 'Separate content into multiple connected pages.',
        text: 'Text',
        textDescription: 'Begin writing with plain text',
        heading: 'Heading',
        headingDescription: 'Create a medium section heading',
        title: 'Title',
        titleDescription: 'Create a bold section heading',
        image: "Image",
        imageDescription: "Embed image link",
        video: 'Reel',
        videoDescription: 'Embed video link"',
        audio: 'Audio',
        audioDescription: 'Embed audio link"',
        question: 'Question',
        questionDescription: "Test user's knowledge by asking question.",
        message: 'Message',
        messageDescription: 'Display message bubble.'
    },
    sr: {
        profile: 'Profil',
        profileDescription: 'Prikaži sebe u najboljem svetlu.',
        blankPage: 'Prazna stranica',
        blankPageDescription: 'Kreiraj novu pod-stranicu unutar ove.',
        carousel: 'Karusel',
        carouselDescription: 'Kreriaj niz poveznaih stranica.',
        text: 'Tekst',
        textDescription: 'Počni sa pisanjem teksta...',
        heading: 'Naslov',
        headingDescription: 'Ubaci naslov.',
        title: 'Veliki naslov',
        titleDescription: 'Ubaci veliki naslov.',
        image: "Image",
        imageDescription: "Dodaj sliku pomoću linka.",
        video: 'Reel',
        videoDescription: 'Dodaj video pomoću linka.',
        audio: 'Zvuk',
        audioDescription: 'Dodaj audio snimak pomoću linka.',
        question: 'Pitanje',
        questionDescription: "Testiraj znanje tvoje publike definisanjem pitanja i odgovora.",
        message: 'Poruka',
        messageDescription: 'Prikaži konverzaciju.'
    }
})

localization.setLanguage('sr')

export const selectorOptions = [
    {
        key: "profile",
        commands: [
            {
                key: "profile",
                label: localization.profile,
                description: localization.profileDescription,
                icon: ProfileIcon
            }
        ]
    },

    {
        key: "pages",
        commands: [
            {
                key: "page-configurer",
                label: localization.blankPage,
                description: localization.blankPageDescription,
                icon: CarouselIcon
            },
            {
                key: "carousel-configurer",
                label: localization.carousel,
                description: localization.carouselDescription,
                icon: CarouselIcon
            }
        ]
    },
    {
        key: "text",
        commands: [
            {
                key: "title",
                label: localization.title,
                description: localization.titleDescription,
                icon: RenameIcon
            },
            {
                key: "heading",
                label: localization.heading,
                description: localization.headingDescription,
                icon: RenameIcon
            },
            {
                key: "text",
                label: localization.text,
                description: localization.textDescription,
                icon: RenameIcon
            }
        ]
    },
    {
        title: "Multimedia",
        key: "multimedia",
        commands: [
            {
                key: "image",
                label: localization.image,
                // description: "Upload an image or embed image link",
                description: localization.imageDescription,
                icon: ImageEditingIcon
            },
            {
                key: "reel",
                label: localization.video,
                // description: "Upload video file or embed video link",
                description: localization.videoDescription,
                icon: VideoEditingIcon
            },
            {
                key: "audio",
                label: localization.audio,
                // description: "Upload an audio file or embed audio link",
                description: localization.audioDescription,
                icon: AudioEditingIcon
            }
        ]
    },
    {
        key: "advanced",
        commands: [
            {
                key: "question",
                label: localization.question,
                description: localization.questionDescription,
                icon: ImageEditingIcon
            },
            {
                key: "message",
                label: localization.message,
                description: localization.messageDescription,
                icon: VideoEditingIcon
            }
        ]
    }

]