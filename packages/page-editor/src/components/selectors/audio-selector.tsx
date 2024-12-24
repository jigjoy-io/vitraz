import React from "react"
import MediaSelector from "./media-selector/media-selector"
import AudioIcon from "@jigjoy-ui/icons/audio-icon"

export default function AudioSelector(props: any) {
	return <MediaSelector mediaType="audio" icon={<AudioIcon />} props={props} />
}
