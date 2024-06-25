import AudioEditingIcon from "../icons/AudioEditingIcon"
import CarouselIcon from "../icons/CarouselIcon"
import ImageEditingIcon from "../icons/ImageEditingIcon"
import ProfileIcon from "../icons/ProfileIcon"
import TextEditingIcon from "../icons/TextEditingIcon"
import VideoEditingIcon from "../icons/VideoEditingIcon"

export const selectorOptions = [

    {
        title: "Important",
        key: "important",
        commands: [
            {
                key: "profile",
                label: "Profile",
                description: "Showcase personal information and expertise.",
                icon: ProfileIcon
            },
            {
                key: "carousel-configurer",
                label: "Page Carousel",
                description: "Separate content into multiple connected pages.",
                icon: CarouselIcon
            }
        ]
    },
    {
        title: "Text",
        key: "text",
        commands: [
            {
                key: "text",
                label: "Text",
                description: "Begin writing with plain text",
                icon: TextEditingIcon
            },
            {
                key: "title",
                label: "Title",
                description: "Create a bold section heading",
                icon: TextEditingIcon
            },
            {
                key: "heading",
                label: "Heading",
                description: "Create a medium section heading",
                icon: TextEditingIcon
            }
        ]
    },
    {
        title: "Multimedia",
        key: "multimedia",
        commands: [
            {
                key: "image",
                label: "Image",
                description: "Upload an image or embed image link",
                icon: ImageEditingIcon
            },
            {
                key: "reel",
                label: "Reel",
                description: "Upload video file or embed video link",
                icon: VideoEditingIcon
            },
            {
                key: "audio",
                label: "Audio",
                description: "Upload an audio file or embed audio link",
                icon: AudioEditingIcon
            }
        ]
    },
    {
        title: "Advanced",
        key: "advanced",
        commands: [
            {
                key: "question",
                label: "Question",
                description: "Test user's knowledge by asking question.",
                icon: ImageEditingIcon
            },
            {
                key: "message",
                label: "Message",
                description: "Display message bubble.",
                icon: VideoEditingIcon
            }
        ]
    }

]