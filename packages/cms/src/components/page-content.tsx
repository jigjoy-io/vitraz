import PageContentFactory from "../util/factories/page-content-factory"
import { useMode } from "../util/store"

export default function PageContent(props: any) {
	const mode = useMode()
	return PageContentFactory.getPageContent(mode, props)
}
