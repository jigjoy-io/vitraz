import { v4 as uuid } from 'uuid'

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
        color: "rose"
    },
    "reel": {
        type: "reel",
        source: "https://www.w3schools.com/html/mov_bbb.mp4",
        position: "left"
    },
    "profile": {
        type: "profile",
        headline: "Headline",
        description: "Decription goes here...",
        image: "https://jigjoy.io/assets/placeholderimage.jpg",
        username: "@username"
    },
    "carousel-tile": {
        type: "carousel-tile",
        cta: "Start"
    },
    "block-selector": {
        type: "block-selector"
    },
    "carousel-configurer": {
        type: "carousel-configurer",
        accessType: "freebie",
        title: "Title",
        description: "Description...",
        numberOfPages: 3,
        display: true
    },    
    "carousel": {
        type: "carousel",
        name: "Carousel",
        environment: 'development',
        linkedPageId: null,
        config: {
            pages: []
        }
    },
    "page-configurer": {
        type: "page-configurer",
        accessType: "freebie",
        title: "Title",
        description: "Description...",
        display: true
    },
    "page-tile": {
        type: "page-tile",
        cta: "Start"
    },
    "blank": {
        
        type: "blank",
        name: "Blank Page",
        environment: 'development',
        linkedPageId: null,
        config: {
            buildingBlocks: []
        }
    }
}