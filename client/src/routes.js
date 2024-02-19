import React from 'react';
import {Routes, Route, Navigate} from 'react-router-dom'
import MainPage from './pages/MainPage/Main';
import MyAccount from './pages/MyAccount/MyAccount';

export const useRoutes = (isLogin) => {
    if(isLogin){
        return (
            <Routes>
                <Route path="/*" element={<MyAccount/>}/>
                <Route path='/login' element={<Navigate replace to='/' />} />
            </Routes>
        )
    }else{
        return(
            <Routes>
                    <Route path="/*" element={<MainPage/>}/>
            </Routes>
        )
    }
    
}
