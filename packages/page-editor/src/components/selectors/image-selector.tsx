import React from "react"
import MediaSelector from "./media-selector/media-selector"
import ImageIcon from "@jigjoy-ui/icons/image-icon"

export default function ImageSelector(props: any) {
	return <MediaSelector mediaType="image" icon={<ImageIcon />} props={props} />
}
