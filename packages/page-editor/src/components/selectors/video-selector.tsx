import React from "react"
import MediaSelector from "./media-selector/media-selector"
import VideoIcon from "@jigjoy-ui/icons/video-icon"

export default function VideoSelector(props: any) {
	return <MediaSelector mediaType="video" icon={<VideoIcon />} props={props} />
}
