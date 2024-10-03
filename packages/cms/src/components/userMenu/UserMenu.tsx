import React, { useState, useEffect } from 'react';
import { signOut, getCurrentUser } from 'aws-amplify/auth';
import { useNavigate } from '@tanstack/react-router';
import { UserIcon } from '../../icons/UserIcon';
import { ExpandDownIcon } from '../../icons/ExpandDownIcon';
import { DiminishUpIcon } from '../../icons/DiminishUpIcon';

const UserMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [userEmail, setUserEmail] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchUserEmail();
    }, []);

    const fetchUserEmail = async () => {
        try {
            const user = await getCurrentUser();
            const { username, signInDetails } = user;
            setUserEmail(signInDetails?.loginId || username);
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    };

    const handleLogout = async () => {
        try {
            await signOut();
            setUserEmail('');
            navigate({ to: '/' });
        } catch (error) {
            console.error('Error signing out: ', error);
        }
    };

    return (
        <div className="fixed top-0 left-0 z-50 w-[260px]">
            <div className="bg-white shadow-md overflow-hidden w-">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full px-4 py-3 flex items-center justify-between text-gray-800 hover:bg-gray-50 transition-colors duration-200"
                >
                    <div className="flex items-center space-x-3">
                        <UserIcon />
                        <span className="font-medium text-sm truncate">{userEmail || 'Loading...'}</span>
                    </div>
                    {isOpen ? <DiminishUpIcon /> : <ExpandDownIcon />}
                </button>
                {isOpen && (
                    <div className="border-t border-gray-200">
                        <button
                            onClick={handleLogout}
                            className="w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserMenu;