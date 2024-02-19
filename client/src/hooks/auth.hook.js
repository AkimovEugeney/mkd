import {useState, useEffect} from 'react';

export const useAuth = () => {
    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(null);
    const [isReady, setReady] = useState(false);

    const login = (token, userId) => {
        setToken(token);
        setUserId(userId);
        localStorage.setItem('userData', JSON.stringify({token, userId}));
    }

    const logout = () => {
        setToken(null);
        setUserId(null);
        localStorage.removeItem('userData');
    }

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('userData'));
        if(data&&data.token) {
            login(data.token, data.userId);
        }
        setReady(true);
    },[login]);

    return {token, userId, isReady, login, logout};
}