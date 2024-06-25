import packageInfo from '../../package.json'
import { v4 as uuid } from 'uuid'

export const templates = {
    "audio": {
        type: "audio",
        source: "https://www.w3schools.com/html/mov_bbb.mp4",
        position: "left",
        builderVersion: packageInfo.version
    },
    "text": {
        type: "text",
        text: "",
        position: "left",
        builderVersion: packageInfo.version
    },
    "heading": {
        type: "heading",
        text: "",
        position: "left",
        builderVersion: packageInfo.version
    },
    "title": {
        type: "title",
        text: "",
        position: "left",
        builderVersion: packageInfo.version
    },
    "image": {
        type: "image",
        source: "https://jigjoy.io/assets/placeholderimage.jpg",
        position: "left",
        size: 'large',
        builderVersion: packageInfo.version
    },
    "question": {
        type: 'question',
        builderVersion: packageInfo.version,
        content: {
            displayQuestion: true,
            text: "Question text...",
            displayImage: true,
            image: "https://jigjoy.io/assets/placeholderimage.jpg"
        },
        answers: [
            {
                id: uuid(),
                correct: false,
                text: "Answer 1 text"
            },
            {
                id: uuid(),
                correct: true,
                text: "Answer 2 text"
            },
            {
                id: uuid(),
                correct: false,
                text: "Answer 3 text"
            }
        ],
        outcomes: {
            confirmationButtonText: "Check the answer",
            correct: {
             message: "The answer is correct.",
             title: "Great!",
             type: "success"
            },
            incorrect: {
             message: "The answer is not correct.",
             title: "Better luck next time",
             type: "danger"
            }
           },
    },
    "message": {
        type: "message",
        message: "Message text goes here...",
        audio: "https://www.w3schools.com/html/mov_bbb.mp4",
        position: "left",
        builderVersion: packageInfo.version,
        color: "rose"
    },
    "reel": {
        type: "reel",
        source: "https://www.w3schools.com/html/mov_bbb.mp4",
        position: "left",
        builderVersion: packageInfo.version
    },
    "profile": {
        type: "profile",
        headline: "Headline",
        description: "Decription goes here...",
        image: "https://jigjoy.io/assets/placeholderimage.jpg",
        username: "@username",
        builderVersion: packageInfo.version
    },
    "carousel-tile": {
        type: "carousel-tile",
        cta: "Start",
        builderVersion: packageInfo.version
    },
    "block-selector": {
        type: "block-selector",
        builderVersion: packageInfo.version
    },
    "carousel-configurer": {
        type: "carousel-configurer",
        accessType: "freebie",
        title: "Title",
        description: "Description...",
        numberOfPages: 3,
        display: true,
        builderVersion: packageInfo.version
    },    
    "carousel": {
        type: "carousel",
        pages: [],
        builderVersion: packageInfo.version
    },
    "blank": {
        type: "blank",
        buildingBlocks: [],
        builderVersion: packageInfo.version
    }
}