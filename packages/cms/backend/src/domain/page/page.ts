import { CreatePageDto, ReturnPageDto, UpdatePageDto } from "@dto/page/page"
import { Entity } from "@entity/entity"
import { CreatePageProps, EnvironmentType, UnmarsalledPage, UpdatePageProps } from "@models/types"
import { schema } from '@schemas/page.schema'


/**
 * Represents a Page domain entity with methods to create, convert to input/output DTOs, and convert to domain object.
 */
export class Page extends Entity<CreatePageProps> {


    private constructor({ id, created, updated, ...props }: CreatePageProps) {
        super(props, id, created, updated)
    }

    public static create(props: CreatePageDto): Page {


        const pageProps: CreatePageProps = {
            type: props.type,
            origin: props.origin,
            devConfig: props.config,
            prodConfig: null
        }


        const instance: Page = new Page(pageProps)
        instance.validate(schema)

        return instance
    }

    public static update(newPage: UpdatePageDto, page: Page): Page {

        const pageProps: UpdatePageProps = {
            id: page.id,
            created: page.created,
            type: newPage.type,
            origin: newPage.origin,
            devConfig: newPage.config,
            prodConfig: page.props.prodConfig
        }


        const instance: Page = new Page(pageProps)
        instance.validate(schema)

        return instance
    }

    public static publish(page: Page): Page {

        const pageProps: UpdatePageProps = {
            id: page.id,
            created: page.created,
            type: page.props.type,
            origin: page.props.origin,
            devConfig: page.props.devConfig,
            prodConfig: page.props.devConfig // coping dev config
        }


        const instance: Page = new Page(pageProps)
        instance.validate(schema)

        return instance
    }

    // create a dto based on the domain instance
    public toInputDto(): UnmarsalledPage {
        return {
            id: this.id,
            created: this.created,
            updated: this.updated,
            origin: this.props.origin,
            type: this.props.type,
            devConfig: this.props.devConfig,
            prodConfig: this.props.prodConfig
        }
    }

    public toOutputDto(environment: EnvironmentType): ReturnPageDto {
        return {
            id: this.id,
            created: this.created,
            updated: this.updated,
            origin: this.props.origin,
            type: this.props.type,
            config: environment == EnvironmentType.Development ? this.props.devConfig : this.props.prodConfig
        }
    }

    // create a domain object based on the dto
    public static toDomain(raw: UnmarsalledPage): Page {
        const instance = new Page(raw)
        instance.validate(schema)
        return instance
    }

    public static toDomains(pages: UnmarsalledPage[]): Page[] {
        let domains: Page[] = []
        pages.forEach(page => {
            let instance = new Page(page)
            instance.validate(schema)
            domains.push(instance)
        })

        return domains
    }



}

