import React from "react"
import AudioEditingIcon from "../../icons/audio-editing-icon"
import MediaSettings from "../shared/media-selector/media-selector"

export default function AudioSelector(props: any) {
	return <MediaSettings mediaType="audio" icon={<AudioEditingIcon />} props={props} />
}
