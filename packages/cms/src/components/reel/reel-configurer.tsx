import React from "react"
import VideoEditingIcon from "../../icons/video-editing-icon"
import MediaSettings from "../media-settings/media-settings"

export default function ReelConfigurer(props: any) {
	return <MediaSettings mediaType="video" icon={<VideoEditingIcon />} props={props} />
}
