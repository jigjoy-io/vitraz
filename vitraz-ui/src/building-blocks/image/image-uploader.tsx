import ImageIcon from "./image.icon"
import MediaSettings from "./media-settings/media-settings"

export default function ImageUploader(props: any) {
	return <MediaSettings mediaType="image" icon={<ImageIcon />} props={props} />
}
