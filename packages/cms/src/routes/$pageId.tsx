import {
  createFileRoute,
  useSearch,
} from '@tanstack/react-router'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { accessPage } from '../api/page'
import Page from '../components/page'
import {
  modeUpdated,
  pageUpdated,
  rootPageUpdated,
} from '../reducers/page-reducer'
import Loader from '../components/loader/loader'
import { PostError } from '../util/errors/post-error'
import LocalizedStrings from 'react-localization'
import { languageUpdated } from '../reducers/localization-reducer'
import { useLanguage } from '../util/store'

let localization = new LocalizedStrings({
  US: {
    loadingMessage: 'The page is loading',
    pageNotFoundMessage: 'Page not found or is not published yet.',
  },
  RS: {
    loadingMessage: 'Stranica se učitava',
    pageNotFoundMessage:
      'Stranica nije pronađena ili nije postavljena na produkciju.',
  },
})

export const Route = createFileRoute('/$pageId' as never)({
  loader: async ({ params: { pageId } }) => {
    try {
      return await accessPage(pageId, localization.pageNotFoundMessage)
    } catch (error) {
      throw error
    }
  },
  errorComponent: PostError,
  pendingComponent: PendingComponent,
  component: PageDisplay,
})

function PendingComponent() {
  const { langParam } = useSearch({
    from: `/$pageId`,
    select: (search: any) => {
      return {
        langParam: search.lang ? search.lang.toUpperCase() : null,
      }
    },
  })

  const lang = langParam || useLanguage()
  localization.setLanguage(lang)

  const dispatch = useDispatch()

  useEffect(() => {
    localization.setLanguage(lang)
    dispatch(languageUpdated(lang))
  }, [lang])

  return lang && <Loader message={localization.loadingMessage} />
}

function PageDisplay() {
  const page = Route.useLoaderData()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(rootPageUpdated(page))
    dispatch(pageUpdated(page))
    dispatch(modeUpdated('visiting'))
  }, [page, dispatch])

  return <Page />
}
