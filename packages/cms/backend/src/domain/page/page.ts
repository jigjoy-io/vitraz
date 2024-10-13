import { CreatePageDto, ReturnPageDto, UpdatePageDto } from "@dto/page/page"
import { Entity } from "@entity/entity"
import { CreatePageProps, EnvironmentType, UnmarsalledPage, UpdatePageProps } from "@models/types"
import { schema } from '@schemas/page.schema'


/**
 * Represents a Page domain entity.
 */
export class Page extends Entity<CreatePageProps> {


    private constructor({ id, created, updated, ...props }: CreatePageProps) {
        super(props, id, created, updated)
    }

    public static create(props: CreatePageDto): Page {


        const pageProps: CreatePageProps = {
            id: props.id ? props.id : undefined,
            type: props.type,
            origin: props.origin,
            config: props.config,
            environment: EnvironmentType.Development,
            linkedPageId: null,
            name: props.name
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
            environment: EnvironmentType.Development,
            linkedPageId: page.props.linkedPageId,
            name: newPage.name,
            origin: newPage.origin,
            config: newPage.config
        }


        const instance: Page = new Page(pageProps)
        instance.validate(schema)

        return instance
    }

    public static publish(page: Page): Page [] {

        const pageProps: CreatePageProps = {
            id: page.props.linkedPageId ? page.props.linkedPageId : undefined,
            type: page.props.type,
            environment: EnvironmentType.Production,
            linkedPageId: page.id,
            name: page.props.name,
            origin: page.props.origin,
            config: page.props.config
        }


        const instance: Page = new Page(pageProps)
        instance.validate(schema)
        page.props.linkedPageId = instance.props.id as string
        return [instance, page]
    }

    // create a dto based on the domain instance
    public toInputDto(): UnmarsalledPage {
        return {
            id: this.id,
            created: this.created,
            updated: this.updated,
            origin: this.props.origin,
            type: this.props.type,
            environment: this.props.environment,
            linkedPageId: this.props.linkedPageId,
            name: this.props.name,
            config: this.props.config
        }
    }

    public toOutputDto(): ReturnPageDto {
        return {
            id: this.id,
            created: this.created,
            updated: this.updated,
            origin: this.props.origin,
            type: this.props.type,
            environment: this.props.environment,
            linkedPageId: this.props.linkedPageId,
            name: this.props.name,
            config: this.props.config
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

