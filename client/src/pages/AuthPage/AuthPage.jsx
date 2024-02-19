import React, {useState, useContext} from 'react';
import { Route, Routes, Navigate,useNavigate } from 'react-router-dom';
import './AuthPage.scss'
import Login from './Login/Login';
import Registration from './Registration/Registration';
import axios from 'axios';
import AuthContext from "../../context/Auth.context";



const AuthPage = (props) => {

const history = useNavigate();

const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    frontDoor: '',
    appartamentNumber: null,
    email: '',
    password: '',
})

const { login } = useContext(AuthContext);

const changeHandler = (e) => {
    setForm({
      ...form,
        [e.target.name]: e.target.value
    })
}

    const [state, setState] = useState('');

    const registerHandler = async () => {
    try {
        await axios.post('/api/auth/registration', {...form},{
            headers: {
                'Content-Type': 'application/json'
            }
        })
        history('/login')
    } catch (error) {
        console.error(error)
        setState(error.response.data.message)
        setTimeout(()=>setState(''),4000)

    }
}



const loginHandler = async () => {
    try {
        await axios.post('/api/auth/login', {...form},{
            headers: {
                'Content-Type': 'application/json'
            }
        })
       .then(response => {
        login(response.data.token, response.data.id)

       })
    } catch (error) {
        console.error(error)
        setState(error.response.data.message)
        setTimeout(()=>setState(''),4000)
    }
}



    return (
        <React.Fragment>
            <div className='container'>
                <div className='auth_page'>
                    <Routes>
                        <Route path='/login' element={<Login changeHandler={changeHandler} loginHandler={loginHandler} state={state}/>}/>
                        <Route path='/registration' element={<Registration changeHandler={changeHandler} registerHandler={registerHandler} state={state}/>}/>
                    </Routes>
                </div>
            </div>
        </React.Fragment>
    );
}

export default AuthPage;
