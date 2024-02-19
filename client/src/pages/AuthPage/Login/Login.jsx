import React from 'react';
import './Login.scss';
import { NavLink,Routes,Route,Navigate } from'react-router-dom';
const Login = (props) => {

    return (
       <div className='login__content'>
        <h3>Авторизация</h3>
       <form className='form form-login' onSubmit={e => e.preventDefault()}>
           <div className='row'>
               <div className='input-field col s12'>
                   <input type="email" name='email' className='validate' onChange={props.changeHandler} required/>
                   <label htmlFor="email">Email</label>
               </div>

               <div className='input-field col s12'>
                   <input type="password" name='password' className='validate' onChange={props.changeHandler} required/>
                   <label htmlFor="password">Password</label>
               </div>
               <div className="row">
                   <button className='wawes-effect wawes-linght btn btn blue' onClick={props.loginHandler}>
                       Войти
                   </button>
                   <NavLink className='btn-outline btn-reg' to="/registration">Нет аккаунта?</NavLink>
               </div>
           </div>
           <p style={{float:"left", paddingBottom:'50px', color:"red"}}>{props.state}</p>
           <div style={{marginTop:"5px"}}>.</div>
       </form>
       </div>
    );
}

export default Login;
