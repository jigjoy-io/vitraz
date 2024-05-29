import { asClass, createContainer } from "awilix"
import { PageService } from "../services/PageService"

// Creating a container
const container = createContainer()

// Registering dependencies
container.register({
  pageService: asClass(PageService).singleton()
})

export default container