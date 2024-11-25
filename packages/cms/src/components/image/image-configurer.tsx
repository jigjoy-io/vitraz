import React from "react"
import ImageEditingIcon from "../../icons/image-editing-icon"
import MediaSettings from "../media-settings/media-settings"

export default function ImageConfigurer(props: any) {
	return <MediaSettings mediaType="image" icon={<ImageEditingIcon />} props={props} />
}
