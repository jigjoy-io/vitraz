import packageInfo from '../../package.json'

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
    },
    "carousel": {
    },
    "message": {
    },
    "reel": {
        type: "reel",
        source: "https://www.w3schools.com/html/mov_bbb.mp4",
        position: "left",
        builderVersion: packageInfo.version
    },
    "profile": {
    },
    "block-selector": {
        type: "block-selector",
        builderVersion: packageInfo.version
    }
}