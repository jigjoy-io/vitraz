import React from 'react'
import { signOut } from 'aws-amplify/auth'
import { useNavigate } from '@tanstack/react-router'
import { useDispatch } from 'react-redux'
import { accountUpdated } from '../../reducers/authReducer'

const LogoutButton = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleLogout = async () => {
        try {
            await signOut()
            dispatch(accountUpdated({
                authorized: false,
                account: null
            }))
            navigate({ to: '/' })
        } catch (error) {
            console.error('LOG Error signing out: ', error)
        }
    }
    return (
        <button onClick={handleLogout}>
            Logout
        </button>
    )
}

export default LogoutButton;