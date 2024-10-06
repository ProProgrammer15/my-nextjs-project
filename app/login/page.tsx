'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { t } = useTranslation('common');
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch('http://0.0.0.0:8000/api/token/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('access_token', data.access);
                localStorage.setItem('refresh_token', data.refresh);
                router.push('/en'); // Redirect to the localized table page after login
            } else {
                setError(t('Invalid username or password'));
            }
        } catch (error) {
            setError(t('An error occurred. Please try again.'));
        }
    };

    return (
        <div>
            <h1>{t('login')}</h1>
            <form onSubmit={handleLogin}>
                <div>
                    <label>{t('username')}</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>{t('password')}</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p>{error}</p>}
                <button type="submit">{t('submit')}</button>
            </form>
        </div>
    );
};

export default LoginPage;
