import React, { useEffect } from "react"
import Designer from "../designer/Designer"
import { handleConfirmSignIn } from "../../api/authorize"
import { useAuthorized, useMode } from "../../util/store"
import { accountUpdated } from "../../reducers/authReducer"
import { useDispatch } from "react-redux"
import { modeUpdated } from "../../reducers/pageReducer"
import { Preview } from "../designer/Preview"
import { useNavigate, useSearch } from "@tanstack/react-router"
import { getCurrentUser } from 'aws-amplify/auth';


export default function Dashboard() {

    const authorized = useAuthorized()
    const dispatch = useDispatch()
    const mode = useMode()
    const navigate = useNavigate()

    const { email, token } = useSearch({
        from: '/dashboard',
        select: (search: any) => {
            return {
                email: search.email,
                token: search.token
            }
        }
    })

    useEffect(() => {
        dispatch(modeUpdated("editing"))
    }, [])

    async function authorize(email, token) {

        if (!authorized) {

            try {

                const challengeResponse = await handleConfirmSignIn(email, token)
                if (challengeResponse) {
                    dispatch(accountUpdated({
                        authorized: true,
                        account: email
                    }))

                }
            } catch (error) {

                switch (error.name) {
                    case 'UserAlreadyAuthenticatedException':
                        dispatch(accountUpdated({
                            authorized: true,
                            account: email
                        }))

                        break
                    default:
                        navigate({ to: '/' })
                        dispatch(accountUpdated({
                            authorized: false,
                            account: null
                        }))

                }
            }

        } else {
            dispatch(accountUpdated({
                authorized: true,
                account: email
            }))

        }


    }

    useEffect(() => {
        authorize(email, token)
    }, [])

    return <>{authorized && <>
        {(mode == 'editing' && authorized) && <Designer />}
        {mode == 'visiting' && <Preview />}
    </>}
    </>
}