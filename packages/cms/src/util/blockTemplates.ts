import packageInfo from '../../package.json'

export const templates = {
    "audio": {

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
    "button": {
    },
    "question": {
    },
    "carousel": {
    },
    "message": {
    },
    "reel": {
    },
    "profile": {
    },
    "cta": {
    },
    "block-selector": {
        type: "block-selector",
        builderVersion: packageInfo.version
    }
}