import React from 'react';
import './MainPage.scss'
import { BrowserRouter, Link, Routes, Route } from'react-router-dom';
import AuthPage from '../AuthPage/AuthPage';
import Info from './Info/Info';
const MainPage = () => {
    return (
    <React.Fragment>
        <div className="wrapper">
            <div className="heaeder-content">
                    <a href="/" className="header-logo">ELHOO</a>
                    <ul className="header-nav">
                        <li><Link to="/login" className="header-nav-li">Войти</Link></li>
                    </ul>

            </div>
        <Routes>
                <Route path="/" element={<Info/>} />
                 <Route path="/*" element={<AuthPage />} />
        </Routes>         
        </div>
        </React.Fragment>
    );
}

export default MainPage;
