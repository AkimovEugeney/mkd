import React from 'react';
import Navbar from '../../component/Navbar/Navbar';
import { Route,Routes } from 'react-router-dom';
import AuthPage from '../AuthPage/AuthPage';
import Dashbrod from './Dashbrod/Dashbrod';
import Offers from './Offers/Offers';
import './MyAccount.scss'
import {Questions} from "./Questions/Questions";

const MyAccount = () => {
    return ( <div>
        <Navbar/>
        <Routes>
                <Route path="/" element={<Dashbrod/>} />
                <Route path="/flat" element={<AuthPage/>} />
                <Route path="/offers" element={<Offers/>} />
                <Route path="/booking" element={<AuthPage/>} />
                <Route path="/profile" element={<AuthPage/>} />
                <Route path="/help" element={<Questions/>} />
            </Routes>
            </div>
    );
}

export default MyAccount;
