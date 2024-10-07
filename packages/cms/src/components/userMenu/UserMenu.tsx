import React, { useState, useEffect, useRef } from 'react'
import { signOut, getCurrentUser } from 'aws-amplify/auth'
import { useNavigate } from '@tanstack/react-router'
import { ExpandDownIcon } from '../../icons/ExpandDownIcon'
import { createPortal } from 'react-dom'
import ClickOutsideListener from '../popover/ClickOutsideListener'
import { blockingUpdated } from '../../reducers/toolbarReducer'
import { useDispatch } from 'react-redux'
import { InitialIcon } from '../../icons/InitialIcon'

const UserMenu = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [userEmail, setUserEmail] = useState('')
    const ref = useRef<HTMLDivElement>(null)

    const [rect, setRect] = useState<null | any>(null)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        fetchUserEmail()
    }, [])

    const fetchUserEmail = async () => {
        try {
            const user = await getCurrentUser()
            const { username, signInDetails } = user
            setUserEmail(signInDetails?.loginId || username)
        } catch (error) {
            console.error('Error fetching user:', error)
        }
    }

    const handleLogout = async () => {
        try {
            await signOut()
            setUserEmail('')
            navigate({ to: '/' })
        } catch (error) {
            console.error('Error signing out: ', error)
        }
    }

    const handleOpen = () => {

        setIsOpen(true)


        if (ref.current)
            setRect(ref.current.getBoundingClientRect())

        dispatch(blockingUpdated(true))
    }

    const handleClose = () => {

        setIsOpen(false)
        dispatch(blockingUpdated(false))

    }

    return (
        <div>
            <div>
                <button
                    onClick={handleOpen}
                    className="p-2 flex items-center justify-between text-gray-800 hover:bg-black-50 transition-colors duration-200"
                >
                    {userEmail && <div className="flex flex-row items-center space-x-2 hover:bg-primary-light hover:bg-opacity-60 p-1 rounded-md" ref={ref}>
                        <InitialIcon initials={userEmail[0].toUpperCase()}/>
                        <ExpandDownIcon />
                    </div>}
                </button>


                {
                    isOpen && createPortal(<ClickOutsideListener callback={handleClose}>

                        <div className={`fixed flex rounded-md p-1 shadow bg-[white] w-[250px]`}
                            style={{ top: rect.top + rect.height, left: rect.x }}>
                            <div className="flex flex-col gap-1 w-full">
                                <span className="p-1 px-2 font-medium text-sm truncate">{userEmail}</span>
                                <div className='border-b border-primary' />
                                <button
                                    onClick={handleLogout}
                                    className="p-1 px-2 text-left text-sm text-gray-700 transition-colors duration-200 hover:bg-primary-light rounded-md"
                                >
                                    Logout
                                </button>
                            </div>

                        </div>
                    </ClickOutsideListener>, document.body)
                }
            </div>
        </div>
    )
}

export default UserMenu