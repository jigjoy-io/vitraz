import React from "react"
import ImageEditingIcon from "../../icons/image-editing-icon"
import MediaSettings from "../shared/media-selector/media-selector"

export default function ImageSelector(props: any) {
	return <MediaSettings mediaType="image" icon={<ImageEditingIcon />} props={props} />
}
