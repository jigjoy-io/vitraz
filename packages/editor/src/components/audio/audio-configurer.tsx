import React from "react"
import AudioEditingIcon from "../../icons/audio-editing-icon"
import MediaSettings from "../media-settings/media-settings"

export default function AudioConfigurer(props: any) {
	return <MediaSettings mediaType="audio" icon={<AudioEditingIcon />} props={props} />
}
