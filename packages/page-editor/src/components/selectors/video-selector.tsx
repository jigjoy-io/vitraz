import React from "react"
import VideoEditingIcon from "../../icons/video-editing-icon"
import MediaSettings from "../shared/media-selector/media-selector"

export default function VideoSelector(props: any) {
	return <MediaSettings mediaType="video" icon={<VideoEditingIcon />} props={props} />
}
