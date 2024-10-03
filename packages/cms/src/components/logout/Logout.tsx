import React from 'react';
import { signOut } from 'aws-amplify/auth';
import { useNavigate } from '@tanstack/react-router';
import { useDispatch } from 'react-redux';
import { accountUpdated } from '../../reducers/authReducer';

const LogoutButton = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const handleLogout = async () => {
        console.log('LOG Logout button clicked');
        try {
            console.log('LOG Attempting to sign out...');
            await signOut();
            console.log('LOG Sign out successful');
            dispatch(accountUpdated({
                authorized: false,
                account: null
            }))
            navigate({ to: '/' });
            console.log('LOG Navigation attempted');
        } catch (error) {
            console.error('LOG Error signing out: ', error);
        }
    };
    return (
        <button onClick={handleLogout}>
            Logout
        </button>
    );
};

export default LogoutButton;