import { createLazyFileRoute } from '@tanstack/react-router'
import { fetchUserAttributes } from '@aws-amplify/auth'
import React from 'react'
import Title from '../components/title/Title'
import Tile from '../components/tile/Tile'
import Heading from '../components/heading/Heading'
import CloseIcon from '../icons/CloseIcon'
import TemplateFactory from '../factories/TemplateFactory'
import { createPage } from '../api/page'
import { v4 as uuid } from 'uuid'
import { useNavigate } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/onboarding')({
    component: Onboarding
})

function Onboarding() {

    const navigate = useNavigate()

    const create = async (type) => {
        const userAttributes = await fetchUserAttributes()

        let page: any = null
        if (type == 'carousel') {
            let pages: any = []
            // create carousel inner pages
            for (let i = 0; i < 3; i++) {
                let page = TemplateFactory.get("blank")
                page.id = uuid()
                pages.push(page)
            }

            // create carousel page
            page = TemplateFactory.get("carousel")
            page.origin = userAttributes.email
            page.config = {
                pages: pages
            }


        } else {
            page = TemplateFactory.get("blank")
            page.origin = userAttributes.email
        }

        await createPage(page)
        navigate({to: "/dashboard"})
    }

    return <div>
        <div className='absolute top-10 right-10 w-max bg-primary-light border-2 border-primary p-1 rounded-md cursor-pointer' onClick={() => navigate({ to: '/dashboard'})}>
            <CloseIcon />
        </div>
        <div className='flex flex-col mt-20 items-center justify-center'>
            <Title position="center" text="Choose a project to start:"></Title>

            <div className='flex flex-row gap-8'>
                <div className='w-[400px] cursor-pointer hover:bg-primary-light hover:rounded-[20px] mt-10' onClick={() => create('blank')}>
                    <Tile>
                        <Heading text="Blank Page"></Heading>
                        <p className='mt-4'>Create an learning app from scratch.</p>
                    </Tile>
                </div>
                <div className='w-[400px] cursor-pointer hover:bg-primary-light hover:rounded-[20px] mt-10' onClick={() => create('carousel')}>
                    <Tile>
                        <Heading text="Carousel"></Heading>
                        <p className='mt-4'>Create a quiz or micro-lesson.</p>
                    </Tile>
                </div>
            </div>

        </div>
    </div>
}