import { createLazyFileRoute } from '@tanstack/react-router'
import { fetchUserAttributes, getCurrentUser } from '@aws-amplify/auth'
import React, { useEffect } from 'react'
import Title from '../components/title/title'
import Tile from '../components/tile/tile'
import Heading from '../components/heading/heading'
import CloseIcon from '../icons/close-icon'
import TemplateFactory from '../factories/template-factory'
import { createPage } from '../api/page'
import { useNavigate } from '@tanstack/react-router'
import { useDispatch } from 'react-redux'
import { useMode } from '../util/store'
import { modeUpdated } from '../reducers/page-reducer'
import Loader from '../components/loader/loader'
import LocalizedStrings from 'react-localization'

let localization = new LocalizedStrings({
    en: {
        chooseProject: "Choose project to start.",
        blankPageHeading: 'Blank Page',
        blankPageDescription: 'Create an app from scratch.',
        carouselHeading: 'Carousel',
        carouselDescription: 'Create a quiz or micro-lesson.',
        loadingMessage: 'Project initialization in progress'
    },
    sr: {
        chooseProject: "Odaberi tip projekta.",
        blankPageHeading: 'Prazna stranica',
        blankPageDescription: 'Kreiraj aplikaciju od početka.',
        carouselHeading: 'Karusel',
        carouselDescription: 'Kreiraj mikro-lekciju ili kviz.',
        loadingMessage: 'Priprema projekta u toku'
    }
})

localization.setLanguage('sr')


export const Route = createLazyFileRoute('/onboarding' as never)({
    component: Onboarding
})

function Onboarding() {

    const navigate = useNavigate()
    const mode = useMode()
    const dispatch = useDispatch()

    useEffect(() => {
        const checkUser = async () => {
            try {
                const user = await getCurrentUser();
                if (!user) {
                    navigate({ to: '/' })
                }
            } catch (error) {
                navigate({ to: '/' })
                console.error("Error checking user authentication:", error)
            }
        }

        checkUser()
    }, [])

    const create = async (type) => {

        dispatch(modeUpdated("loading"))

        const userAttributes = await fetchUserAttributes()

        let page = TemplateFactory.createPage(type, userAttributes.email)

        let createdPage = await createPage(page)

        navigate({
            to: `/dashboard`,
            search: { pageId: createdPage.id }
        })
    }

    return <div>{
        mode == "editing" && <>
            <div className='absolute top-10 right-10 w-max bg-primary-light border-2 border-primary p-1 rounded-md cursor-pointer' onClick={() => navigate({ to: '/dashboard' })}>
                <CloseIcon />
            </div>
            <div className='flex flex-col mt-20 items-center justify-center'>
                <Title position="center" text={localization.chooseProject}></Title>

                <div className='flex flex-row gap-8'>
                    <div className='w-[400px] cursor-pointer hover:bg-primary-light hover:rounded-[20px] mt-10' onClick={() => create('blank')}>
                        <Tile>
                            <Heading text={localization.blankPageHeading} />
                            <p className='mt-4'>{localization.blankPageDescription}</p>
                        </Tile>
                    </div>
                    <div className='w-[400px] cursor-pointer hover:bg-primary-light hover:rounded-[20px] mt-10' onClick={() => create('carousel')}>
                        <Tile>
                            <Heading text={localization.carouselHeading} />
                            <p className='mt-4'>{localization.carouselDescription}</p>
                        </Tile>
                    </div>
                </div>

            </div>
        </>


    }
        {
            mode == "loading" && <Loader message={localization.loadingMessage} />
        }

    </div>
}